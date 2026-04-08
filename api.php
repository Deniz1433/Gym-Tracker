<?php
declare(strict_types=1);

require __DIR__ . '/db.php';

session_set_cookie_params([
    'lifetime' => 60 * 60 * 24 * 30,
    'path'     => '/',
    'httponly' => true,
    'samesite' => 'Lax',
    'secure'   => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
]);
session_start();

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

// CSRF protection: state-changing requests must carry a header that
// cross-origin HTML forms cannot set without a CORS preflight (which we
// never grant). Both our fetch() helper and HTMX satisfy one of these.
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
    $xrw  = $_SERVER['HTTP_X_REQUESTED_WITH'] ?? '';
    $hxrq = $_SERVER['HTTP_HX_REQUEST']       ?? '';
    if ($xrw !== 'fetch' && $hxrq !== 'true') {
        http_response_code(403);
        echo json_encode(['error' => 'forbidden']);
        exit;
    }
}

function json_out(array $data, int $code = 200): never {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function fail(string $msg, int $code = 400): never {
    json_out(['error' => $msg], $code);
}

function body(): array {
    $raw = file_get_contents('php://input') ?: '';
    if ($raw === '') return [];
    try {
        $j = json_decode($raw, true, 32, JSON_THROW_ON_ERROR);
    } catch (JsonException) {
        fail('invalid JSON', 400);
    }
    return is_array($j) ? $j : [];
}

function require_user(): int {
    $uid = $_SESSION['uid'] ?? null;
    if (!is_int($uid)) fail('not signed in', 401);
    return $uid;
}

function client_ip(): string {
    return (string)($_SERVER['REMOTE_ADDR'] ?? '');
}

// Counts failed signin attempts in the last 15 minutes for either the
// given email or the given IP. Returns true if the caller should be
// blocked from attempting another signin.
function signin_blocked(PDO $db, string $email, string $ip): bool {
    $cutoff = (new DateTimeImmutable('-15 minutes', new DateTimeZone('UTC')))
        ->format('Y-m-d\TH:i:s.v\Z');
    $stmt = $db->prepare(
        'SELECT COUNT(*) FROM login_attempts
          WHERE success = 0 AND created_at > ? AND (email = ? OR ip = ?)'
    );
    $stmt->execute([$cutoff, $email, $ip]);
    // 10 failures in 15min across (this email OR this IP) trips the block.
    return ((int)$stmt->fetchColumn()) >= 10;
}

function record_signin_attempt(PDO $db, string $email, string $ip, bool $success): void {
    $stmt = $db->prepare('INSERT INTO login_attempts (email, ip, success) VALUES (?, ?, ?)');
    $stmt->execute([$email, $ip, $success ? 1 : 0]);
}

function valid_date(string $d): bool {
    $dt = DateTimeImmutable::createFromFormat('Y-m-d', $d);
    return $dt !== false && $dt->format('Y-m-d') === $d;
}

function not_in_future(string $d): bool {
    $today = (new DateTimeImmutable('today'))->format('Y-m-d');
    return $d <= $today;
}

function workout_row_to_payload(array $r): array {
    return [
        'date'         => $r['date'],
        'has_strength' => (int)$r['has_strength'] === 1,
        'has_cardio'   => (int)$r['has_cardio'] === 1,
        'duration_min' => $r['duration_min'] !== null ? (float)$r['duration_min'] : null,
        'distance_km'  => $r['distance_km']  !== null ? (float)$r['distance_km']  : null,
        'calories'     => $r['calories']     !== null ? (float)$r['calories']     : null,
        'notes'        => $r['notes'],
        'updated_at'   => $r['updated_at'],
    ];
}

$action = $_GET['action'] ?? '';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$db = db();

try {
    switch ("$method $action") {

        case 'POST signup': {
            $b = body();
            $email = trim((string)($b['email'] ?? ''));
            $pass  = (string)($b['password'] ?? '');
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) fail('invalid email');
            if (strlen($pass) < 8) fail('password must be at least 8 characters');

            $stmt = $db->prepare('SELECT id FROM users WHERE email = ?');
            $stmt->execute([$email]);
            if ($stmt->fetch()) fail('email already registered', 409);

            $hash = password_hash($pass, PASSWORD_DEFAULT);
            $stmt = $db->prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)');
            $stmt->execute([$email, $hash]);
            $_SESSION['uid'] = (int)$db->lastInsertId();
            session_regenerate_id(true);
            json_out(['ok' => true, 'email' => $email]);
        }

        case 'POST signin': {
            $b = body();
            $email = trim((string)($b['email'] ?? ''));
            $pass  = (string)($b['password'] ?? '');
            $ip    = client_ip();

            if (signin_blocked($db, $email, $ip)) {
                fail('too many attempts, please wait a few minutes', 429);
            }

            $stmt = $db->prepare('SELECT id, password_hash FROM users WHERE email = ?');
            $stmt->execute([$email]);
            $row = $stmt->fetch();
            if (!$row || !password_verify($pass, $row['password_hash'])) {
                record_signin_attempt($db, $email, $ip, false);
                fail('invalid credentials', 401);
            }

            // Upgrade the stored hash if PHP's default cost has been bumped
            // since this account was created.
            if (password_needs_rehash($row['password_hash'], PASSWORD_DEFAULT)) {
                $newHash = password_hash($pass, PASSWORD_DEFAULT);
                $up = $db->prepare('UPDATE users SET password_hash = ? WHERE id = ?');
                $up->execute([$newHash, (int)$row['id']]);
            }

            record_signin_attempt($db, $email, $ip, true);
            $_SESSION['uid'] = (int)$row['id'];
            session_regenerate_id(true);
            json_out(['ok' => true, 'email' => $email]);
        }

        case 'POST signout': {
            $_SESSION = [];
            if (ini_get('session.use_cookies')) {
                $p = session_get_cookie_params();
                setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
            }
            session_destroy();
            json_out(['ok' => true]);
        }

        case 'GET me': {
            $uid = $_SESSION['uid'] ?? null;
            if (!is_int($uid)) json_out(['signed_in' => false]);
            $stmt = $db->prepare('SELECT email FROM users WHERE id = ?');
            $stmt->execute([$uid]);
            $row = $stmt->fetch();
            if (!$row) json_out(['signed_in' => false]);
            json_out(['signed_in' => true, 'email' => $row['email']]);
        }

        case 'GET workouts': {
            $uid  = require_user();
            $from = (string)($_GET['from'] ?? '');
            $to   = (string)($_GET['to']   ?? '');
            if ($from === '' && $to === '') {
                $stmt = $db->prepare(
                    'SELECT date, has_strength, has_cardio, duration_min, distance_km, calories, notes, updated_at
                       FROM workouts WHERE user_id = ? ORDER BY date'
                );
                $stmt->execute([$uid]);
            } else {
                if (!valid_date($from) || !valid_date($to)) fail('from/to must both be YYYY-MM-DD');
                $stmt = $db->prepare(
                    'SELECT date, has_strength, has_cardio, duration_min, distance_km, calories, notes, updated_at
                       FROM workouts
                      WHERE user_id = ? AND date BETWEEN ? AND ?
                      ORDER BY date'
                );
                $stmt->execute([$uid, $from, $to]);
            }
            $out = [];
            foreach ($stmt->fetchAll() as $r) $out[] = workout_row_to_payload($r);
            json_out(['workouts' => $out]);
        }

        case 'POST workout': {
            $uid = require_user();
            $b = body();
            $date = (string)($b['date'] ?? '');
            if (!valid_date($date)) fail('invalid date');
            if (!not_in_future($date)) fail('cannot log a future date');

            $hasStrength = !empty($b['has_strength']) ? 1 : 0;
            $hasCardio   = !empty($b['has_cardio'])   ? 1 : 0;

            $duration = isset($b['duration_min']) && $b['duration_min'] !== '' ? (float)$b['duration_min'] : null;
            $distance = isset($b['distance_km'])  && $b['distance_km']  !== '' ? (float)$b['distance_km']  : null;
            $calories = isset($b['calories'])     && $b['calories']     !== '' ? (float)$b['calories']     : null;
            $notes    = isset($b['notes']) ? (string)$b['notes'] : null;
            if ($notes !== null && trim($notes) === '') $notes = null;

            if (!$hasCardio) { $duration = null; $distance = null; $calories = null; }
            foreach ([$duration, $distance, $calories] as $n) {
                if ($n !== null && ($n < 0 || $n > 100000)) fail('numeric value out of range');
            }

            $now = now_iso();
            $stmt = $db->prepare(
                'INSERT INTO workouts
                    (user_id, date, has_strength, has_cardio, duration_min, distance_km, calories, notes, updated_at)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                 ON CONFLICT(user_id, date) DO UPDATE SET
                    has_strength = excluded.has_strength,
                    has_cardio   = excluded.has_cardio,
                    duration_min = excluded.duration_min,
                    distance_km  = excluded.distance_km,
                    calories     = excluded.calories,
                    notes        = excluded.notes,
                    updated_at   = excluded.updated_at'
            );
            $stmt->execute([$uid, $date, $hasStrength, $hasCardio, $duration, $distance, $calories, $notes, $now]);

            $stmt = $db->prepare(
                'SELECT date, has_strength, has_cardio, duration_min, distance_km, calories, notes, updated_at
                   FROM workouts WHERE user_id = ? AND date = ?'
            );
            $stmt->execute([$uid, $date]);
            json_out(['ok' => true, 'workout' => workout_row_to_payload($stmt->fetch())]);
        }

        case 'POST delete_workout': {
            $uid = require_user();
            $b = body();
            $date = (string)($b['date'] ?? '');
            if (!valid_date($date)) fail('invalid date');
            $stmt = $db->prepare('DELETE FROM workouts WHERE user_id = ? AND date = ?');
            $stmt->execute([$uid, $date]);
            json_out(['ok' => true]);
        }

        case 'POST sync': {
            // Bulk sync: client sends entire local dataset.
            // Conflict rule: pick the dataset (client vs server) with more logged days;
            // tiebreaker = more recent max(updated_at).
            $uid = require_user();
            $b = body();
            $incoming = is_array($b['workouts'] ?? null) ? $b['workouts'] : [];
            $force = !empty($b['force']);

            // Tally incoming.
            $clientCount = 0;
            $clientLatest = '';
            $clean = [];
            foreach ($incoming as $w) {
                $d = (string)($w['date'] ?? '');
                if (!valid_date($d) || !not_in_future($d)) continue;
                $hs = !empty($w['has_strength']) ? 1 : 0;
                $hc = !empty($w['has_cardio'])   ? 1 : 0;
                $upd = (string)($w['updated_at'] ?? now_iso());
                $clean[$d] = [
                    'date'         => $d,
                    'has_strength' => $hs,
                    'has_cardio'   => $hc,
                    'duration_min' => $hc && isset($w['duration_min']) && $w['duration_min'] !== '' ? (float)$w['duration_min'] : null,
                    'distance_km'  => $hc && isset($w['distance_km'])  && $w['distance_km']  !== '' ? (float)$w['distance_km']  : null,
                    'calories'     => $hc && isset($w['calories'])     && $w['calories']     !== '' ? (float)$w['calories']     : null,
                    'notes'        => isset($w['notes']) && trim((string)$w['notes']) !== '' ? (string)$w['notes'] : null,
                    'updated_at'   => $upd,
                ];
                $clientCount++;
                if ($upd > $clientLatest) $clientLatest = $upd;
            }

            $stmt = $db->prepare(
                'SELECT date, has_strength, has_cardio, duration_min, distance_km, calories, notes, updated_at
                   FROM workouts WHERE user_id = ?'
            );
            $stmt->execute([$uid]);
            $serverRows = $stmt->fetchAll();
            $serverCount = count($serverRows);
            $serverLatest = '';
            foreach ($serverRows as $r) {
                if ($r['updated_at'] > $serverLatest) $serverLatest = $r['updated_at'];
            }

            $clientWins = ($clientCount > $serverCount)
                || ($clientCount === $serverCount && $clientLatest > $serverLatest);
            $apply = $force || ($clientWins && $clientCount > 0);

            if ($apply) {
                $db->beginTransaction();
                try {
                    $del = $db->prepare('DELETE FROM workouts WHERE user_id = ?');
                    $del->execute([$uid]);
                    $ins = $db->prepare(
                        'INSERT INTO workouts
                            (user_id, date, has_strength, has_cardio, duration_min, distance_km, calories, notes, updated_at)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
                    );
                    foreach ($clean as $w) {
                        $ins->execute([
                            $uid, $w['date'], $w['has_strength'], $w['has_cardio'],
                            $w['duration_min'], $w['distance_km'], $w['calories'],
                            $w['notes'], $w['updated_at'],
                        ]);
                    }
                    $db->commit();
                } catch (Throwable $e) {
                    $db->rollBack();
                    throw $e;
                }
            }

            // Return authoritative server state.
            $stmt = $db->prepare(
                'SELECT date, has_strength, has_cardio, duration_min, distance_km, calories, notes, updated_at
                   FROM workouts WHERE user_id = ? ORDER BY date'
            );
            $stmt->execute([$uid]);
            $out = [];
            foreach ($stmt->fetchAll() as $r) $out[] = workout_row_to_payload($r);
            json_out([
                'ok'           => true,
                'applied'      => $apply,
                'client_wins'  => $clientWins,
                'client_count' => $clientCount,
                'server_count' => count($out),
                'workouts'     => $out,
            ]);
        }

        default:
            fail('unknown action', 404);
    }
} catch (Throwable $e) {
    // Log details server-side; never echo exception text to clients —
    // it can leak file paths, SQL fragments, or stored note content.
    error_log('api.php error: ' . $e->getMessage() . ' @ ' . $e->getFile() . ':' . $e->getLine());
    fail('server error', 500);
}
