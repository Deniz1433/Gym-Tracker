<?php
declare(strict_types=1);

function db(): PDO {
    static $pdo = null;
    if ($pdo !== null) return $pdo;

    $dir = __DIR__ . '/data';
    if (!is_dir($dir)) {
        mkdir($dir, 0775, true);
    }
    $path = $dir . '/gym.db';
    $pdo = new PDO('sqlite:' . $path, null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $pdo->exec('PRAGMA foreign_keys = ON');
    $pdo->exec('PRAGMA journal_mode = WAL');

    $pdo->exec(<<<SQL
        CREATE TABLE IF NOT EXISTS users (
            id            INTEGER PRIMARY KEY AUTOINCREMENT,
            email         TEXT    NOT NULL UNIQUE COLLATE NOCASE,
            password_hash TEXT    NOT NULL,
            created_at    TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
        );
    SQL);

    $pdo->exec(<<<SQL
        CREATE TABLE IF NOT EXISTS workouts (
            id           INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id      INTEGER NOT NULL,
            date         TEXT    NOT NULL,
            has_strength INTEGER NOT NULL DEFAULT 0,
            has_cardio   INTEGER NOT NULL DEFAULT 0,
            duration_min REAL,
            distance_km  REAL,
            calories     REAL,
            notes        TEXT,
            updated_at   TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
            UNIQUE(user_id, date),
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        );
    SQL);

    $pdo->exec('CREATE INDEX IF NOT EXISTS idx_workouts_user_date ON workouts(user_id, date)');

    $pdo->exec(<<<SQL
        CREATE TABLE IF NOT EXISTS login_attempts (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            email      TEXT    NOT NULL,
            ip         TEXT    NOT NULL,
            success    INTEGER NOT NULL,
            created_at TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
        );
    SQL);
    $pdo->exec('CREATE INDEX IF NOT EXISTS idx_login_attempts_email ON login_attempts(email, created_at)');
    $pdo->exec('CREATE INDEX IF NOT EXISTS idx_login_attempts_ip    ON login_attempts(ip, created_at)');

    return $pdo;
}

function now_iso(): string {
    return (new DateTimeImmutable('now', new DateTimeZone('UTC')))
        ->format('Y-m-d\TH:i:s.v\Z');
}
