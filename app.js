'use strict';

const LS_KEY       = 'gym-tracker:workouts:v1';
const SETTINGS_KEY = 'gym-tracker:settings:v1';

// =====================================================================
// Themes
// =====================================================================
const THEMES = {
    dark: {
        name: 'Dark',
        page: '#0f172a', surface: '#1e293b', elev: '#334155', elevHover: '#475569',
        topbar: '#0b1220', topbarText: '#f1f5f9',
        textPri: '#f1f5f9', textSec: '#cbd5e1', textMut: '#64748b',
        border: '#334155', overlay: 'rgba(0, 0, 0, 0.7)', btnHover: 'rgba(255, 255, 255, 0.08)',
        accent: '#38bdf8', accentText: '#0c1e2e', accentHover: '#7dd3fc',
        strength: '#ea580c', strengthText: '#ffedd5',
        cardio:   '#0284c7', cardioText:   '#e0f2fe',
        both:     '#16a34a', bothText:     '#dcfce7',
        rest:     '#1e293b', restText:     '#94a3b8',
        future:   '#172033', futureText:   '#475569',
        todayRing:'#60a5fa',
    },
    light: {
        name: 'Light',
        page: '#f8fafc', surface: '#ffffff', elev: '#f1f5f9', elevHover: '#e2e8f0',
        topbar: '#ffffff', topbarText: '#0f172a',
        textPri: '#0f172a', textSec: '#475569', textMut: '#94a3b8',
        border: '#e2e8f0', overlay: 'rgba(15, 23, 42, 0.5)', btnHover: 'rgba(0, 0, 0, 0.05)',
        accent: '#0ea5e9', accentText: '#ffffff', accentHover: '#0284c7',
        strength: '#fed7aa', strengthText: '#7c2d12',
        cardio:   '#bae6fd', cardioText:   '#0c4a6e',
        both:     '#a7f3d0', bothText:     '#064e3b',
        rest:     '#f1f5f9', restText:     '#64748b',
        future:   '#f8fafc', futureText:   '#cbd5e1',
        todayRing:'#2563eb',
    },
    'gruvbox-dark': {
        name: 'Gruvbox Dark',
        page: '#282828', surface: '#3c3836', elev: '#504945', elevHover: '#665c54',
        topbar: '#1d2021', topbarText: '#ebdbb2',
        textPri: '#ebdbb2', textSec: '#d5c4a1', textMut: '#928374',
        border: '#504945', overlay: 'rgba(0, 0, 0, 0.7)', btnHover: 'rgba(235, 219, 178, 0.08)',
        accent: '#fabd2f', accentText: '#1d2021', accentHover: '#fe8019',
        strength: '#d65d0e', strengthText: '#fbf1c7',
        cardio:   '#458588', cardioText:   '#fbf1c7',
        both:     '#98971a', bothText:     '#1d2021',
        rest:     '#32302f', restText:     '#928374',
        future:   '#1d2021', futureText:   '#665c54',
        todayRing:'#fabd2f',
    },
    'solarized-dark': {
        name: 'Solarized Dark',
        page: '#002b36', surface: '#073642', elev: '#586e75', elevHover: '#657b83',
        topbar: '#001f27', topbarText: '#93a1a1',
        textPri: '#93a1a1', textSec: '#839496', textMut: '#586e75',
        border: '#073642', overlay: 'rgba(0, 0, 0, 0.7)', btnHover: 'rgba(147, 161, 161, 0.08)',
        accent: '#268bd2', accentText: '#fdf6e3', accentHover: '#2aa198',
        strength: '#cb4b16', strengthText: '#fdf6e3',
        cardio:   '#268bd2', cardioText:   '#fdf6e3',
        both:     '#859900', bothText:     '#002b36',
        rest:     '#073642', restText:     '#586e75',
        future:   '#001f27', futureText:   '#586e75',
        todayRing:'#b58900',
    },
    dracula: {
        name: 'Dracula',
        page: '#282a36', surface: '#44475a', elev: '#6272a4', elevHover: '#7783b8',
        topbar: '#1e1f29', topbarText: '#f8f8f2',
        textPri: '#f8f8f2', textSec: '#f8f8f2', textMut: '#6272a4',
        border: '#44475a', overlay: 'rgba(0, 0, 0, 0.7)', btnHover: 'rgba(248, 248, 242, 0.08)',
        accent: '#bd93f9', accentText: '#282a36', accentHover: '#d6acff',
        strength: '#ff79c6', strengthText: '#282a36',
        cardio:   '#8be9fd', cardioText:   '#282a36',
        both:     '#50fa7b', bothText:     '#282a36',
        rest:     '#44475a', restText:     '#6272a4',
        future:   '#1e1f29', futureText:   '#44475a',
        todayRing:'#bd93f9',
    },
    nord: {
        name: 'Nord',
        page: '#2e3440', surface: '#3b4252', elev: '#434c5e', elevHover: '#4c566a',
        topbar: '#242933', topbarText: '#eceff4',
        textPri: '#eceff4', textSec: '#d8dee9', textMut: '#4c566a',
        border: '#434c5e', overlay: 'rgba(0, 0, 0, 0.7)', btnHover: 'rgba(236, 239, 244, 0.08)',
        accent: '#88c0d0', accentText: '#2e3440', accentHover: '#8fbcbb',
        strength: '#d08770', strengthText: '#2e3440',
        cardio:   '#5e81ac', cardioText:   '#eceff4',
        both:     '#a3be8c', bothText:     '#2e3440',
        rest:     '#3b4252', restText:     '#4c566a',
        future:   '#242933', futureText:   '#434c5e',
        todayRing:'#88c0d0',
    },
    'catppuccin-mocha': {
        name: 'Catppuccin Mocha',
        page: '#1e1e2e', surface: '#313244', elev: '#45475a', elevHover: '#585b70',
        topbar: '#11111b', topbarText: '#cdd6f4',
        textPri: '#cdd6f4', textSec: '#bac2de', textMut: '#6c7086',
        border: '#45475a', overlay: 'rgba(0, 0, 0, 0.7)', btnHover: 'rgba(205, 214, 244, 0.08)',
        accent: '#cba6f7', accentText: '#1e1e2e', accentHover: '#b4befe',
        strength: '#fab387', strengthText: '#1e1e2e',
        cardio:   '#89b4fa', cardioText:   '#1e1e2e',
        both:     '#a6e3a1', bothText:     '#1e1e2e',
        rest:     '#313244', restText:     '#6c7086',
        future:   '#181825', futureText:   '#45475a',
        todayRing:'#cba6f7',
    },
    'tokyo-night': {
        name: 'Tokyo Night',
        page: '#1a1b26', surface: '#24283b', elev: '#414868', elevHover: '#565f89',
        topbar: '#16161e', topbarText: '#c0caf5',
        textPri: '#c0caf5', textSec: '#a9b1d6', textMut: '#565f89',
        border: '#414868', overlay: 'rgba(0, 0, 0, 0.7)', btnHover: 'rgba(192, 202, 245, 0.08)',
        accent: '#7aa2f7', accentText: '#1a1b26', accentHover: '#bb9af7',
        strength: '#f7768e', strengthText: '#1a1b26',
        cardio:   '#7aa2f7', cardioText:   '#1a1b26',
        both:     '#9ece6a', bothText:     '#1a1b26',
        rest:     '#24283b', restText:     '#565f89',
        future:   '#16161e', futureText:   '#414868',
        todayRing:'#bb9af7',
    },
};

// Pick a readable text color (near-black or near-white) given an arbitrary hex.
function contrastText(hex) {
    if (!hex || typeof hex !== 'string' || hex.length !== 7 || hex[0] !== '#') return '#f8fafc';
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    return lum > 0.6 ? '#0f172a' : '#f8fafc';
}

function applyThemeVars(t, overrides, themeKey) {
    if (!t) return;
    overrides = overrides || {};
    const r = document.documentElement;
    const set = (k, v) => r.style.setProperty(k, v);
    set('--c-page',        t.page);
    set('--c-surface',     t.surface);
    set('--c-elev',        t.elev);
    set('--c-elev-hover',  t.elevHover);
    set('--c-topbar',      t.topbar);
    set('--c-topbar-text', t.topbarText);
    set('--c-text-pri',    t.textPri);
    set('--c-text-sec',    t.textSec);
    set('--c-text-mut',    t.textMut);
    set('--c-border',      t.border);
    set('--c-overlay',     t.overlay);
    set('--c-btn-hover',   t.btnHover);
    set('--c-accent',      t.accent);
    set('--c-accent-text', t.accentText);
    set('--c-accent-hover',t.accentHover);
    set('--c-future',      t.future);
    set('--c-future-text', t.futureText);
    set('--c-today-ring',  t.todayRing);

    set('--c-strength',      overrides.strength || t.strength);
    set('--c-strength-text', overrides.strength ? contrastText(overrides.strength) : t.strengthText);
    set('--c-cardio',        overrides.cardio   || t.cardio);
    set('--c-cardio-text',   overrides.cardio   ? contrastText(overrides.cardio)   : t.cardioText);
    set('--c-both',          overrides.both     || t.both);
    set('--c-both-text',     overrides.both     ? contrastText(overrides.both)     : t.bothText);
    set('--c-rest',          overrides.rest     || t.rest);
    set('--c-rest-text',     overrides.rest     ? contrastText(overrides.rest)     : t.restText);

    if (themeKey) r.dataset.theme = themeKey;
}

// Apply stored theme synchronously at script load time so the page never
// flashes with the wrong theme before Alpine init runs.
(function applyEarly() {
    try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        if (!raw) return;
        const s = JSON.parse(raw);
        const key = (s && s.theme) || 'dark';
        const ov  = (s && s.colorOverrides) || {};
        applyThemeVars(THEMES[key] || THEMES.dark, ov, key);
    } catch { /* fall through to default */ }
})();

// =====================================================================
// Alpine component
// =====================================================================
function gymApp() {
    return {
        // -------- State --------
        user: null,
        viewYear: 0,
        viewMonth: 0,
        workouts: {},              // { 'YYYY-MM-DD': workout }
        selectedDate: null,

        showDayModal:     false,
        showProfileModal: false,
        showMergeModal:   false,
        showSettingsModal:false,
        signupNotice:     '',

        day: {
            has_strength: false,
            has_cardio:   false,
            duration_min: '',
            distance_km:  '',
            calories:     '',
            notes:        '',
        },
        dayMsg:  '',
        authMsg: '',

        mergeLocal:  { count: 0, updated: '—' },
        mergeRemote: { count: 0, updated: '—' },
        _mergeResolve: null,

        themes: THEMES,
        settings: {
            theme: 'dark',
            showCellIcons: false,
            colorOverrides: { strength: null, cardio: null, both: null, rest: null },
        },

        // -------- Init --------
        async init() {
            this.loadSettings();
            this.applyTheme();

            const now = new Date();
            this.viewYear  = now.getFullYear();
            this.viewMonth = now.getMonth();
            try {
                const me = await this.api('me');
                if (me.signed_in) this.user = me.email;
            } catch { /* anonymous */ }
            await this.loadMonth();
            this.refreshIcons();
        },

        refreshIcons() {
            this.$nextTick(() => {
                if (window.lucide && typeof window.lucide.createIcons === 'function') {
                    window.lucide.createIcons();
                }
            });
        },

        // -------- Settings --------
        loadSettings() {
            try {
                const raw = localStorage.getItem(SETTINGS_KEY);
                if (!raw) return;
                const s = JSON.parse(raw);
                if (s && typeof s === 'object') {
                    this.settings = {
                        theme:         s.theme && THEMES[s.theme] ? s.theme : 'dark',
                        showCellIcons: !!s.showCellIcons,
                        colorOverrides: {
                            strength: s.colorOverrides?.strength || null,
                            cardio:   s.colorOverrides?.cardio   || null,
                            both:     s.colorOverrides?.both     || null,
                            rest:     s.colorOverrides?.rest     || null,
                        },
                    };
                }
            } catch { /* keep defaults */ }
        },

        saveSettings() {
            try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(this.settings)); } catch {}
        },

        applyTheme() {
            const t = THEMES[this.settings.theme] || THEMES.dark;
            applyThemeVars(t, this.settings.colorOverrides, this.settings.theme);
        },

        openSettings() {
            this.showSettingsModal = true;
            this.refreshIcons();
        },

        onThemeChange() {
            this.applyTheme();
            this.saveSettings();
        },

        onIconsToggle() {
            this.saveSettings();
            this.refreshIcons();
        },

        effectiveColor(kind) {
            const override = this.settings.colorOverrides[kind];
            if (override) return override;
            const t = THEMES[this.settings.theme] || THEMES.dark;
            return t[kind];
        },

        setColorOverride(kind, hex) {
            this.settings.colorOverrides[kind] = hex;
            this.applyTheme();
            this.saveSettings();
        },

        resetColorOverride(kind) {
            this.settings.colorOverrides[kind] = null;
            this.applyTheme();
            this.saveSettings();
        },

        resetAllOverrides() {
            this.settings.colorOverrides = { strength: null, cardio: null, both: null, rest: null };
            this.applyTheme();
            this.saveSettings();
        },

        // -------- API helper --------
        async api(action, opts = {}) {
            const url = `api.php?action=${encodeURIComponent(action)}` +
                (opts.query ? '&' + new URLSearchParams(opts.query).toString() : '');
            const init = { method: opts.method || 'GET', credentials: 'same-origin' };
            if (opts.body !== undefined) {
                init.headers = { 'Content-Type': 'application/json' };
                init.body = JSON.stringify(opts.body);
            }
            const res = await fetch(url, init);
            let data = {};
            try { data = await res.json(); } catch { /* non-JSON */ }
            if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
            return data;
        },

        // -------- Local store (anonymous mode) --------
        localAll() {
            try {
                const raw = localStorage.getItem(LS_KEY);
                if (!raw) return {};
                const obj = JSON.parse(raw);
                return (obj && typeof obj === 'object') ? obj : {};
            } catch { return {}; }
        },
        localList() { return Object.values(this.localAll()); },
        localSet(w) {
            const all = this.localAll();
            all[w.date] = w;
            localStorage.setItem(LS_KEY, JSON.stringify(all));
        },
        localDelete(date) {
            const all = this.localAll();
            delete all[date];
            localStorage.setItem(LS_KEY, JSON.stringify(all));
        },
        localClear() { localStorage.removeItem(LS_KEY); },

        // -------- Date helpers --------
        pad(n) { return String(n).padStart(2, '0'); },
        ymd(d) { return `${d.getFullYear()}-${this.pad(d.getMonth() + 1)}-${this.pad(d.getDate())}`; },
        todayYmd() { return this.ymd(new Date()); },
        nowIso() { return new Date().toISOString(); },

        get monthLabel() {
            const names = ['January','February','March','April','May','June',
                           'July','August','September','October','November','December'];
            return `${names[this.viewMonth]} ${this.viewYear}`;
        },

        // -------- Calendar data --------
        async loadMonth() {
            this.workouts = {};
            const first = new Date(this.viewYear, this.viewMonth, 1);
            const last  = new Date(this.viewYear, this.viewMonth + 1, 0);
            const fromS = this.ymd(first), toS = this.ymd(last);

            if (this.user) {
                try {
                    const data = await this.api('workouts', { query: { from: fromS, to: toS } });
                    const next = {};
                    for (const w of data.workouts) next[w.date] = w;
                    this.workouts = next;
                } catch (e) {
                    console.error('loadMonth failed', e);
                }
            } else {
                const next = {};
                for (const w of this.localList()) {
                    if (w.date >= fromS && w.date <= toS) next[w.date] = w;
                }
                this.workouts = next;
            }
            this.refreshIcons();
        },

        async prevMonth() {
            this.viewMonth--;
            if (this.viewMonth < 0) { this.viewMonth = 11; this.viewYear--; }
            await this.loadMonth();
        },
        async nextMonth() {
            this.viewMonth++;
            if (this.viewMonth > 11) { this.viewMonth = 0; this.viewYear++; }
            await this.loadMonth();
        },

        get cells() {
            const out = [];
            const first = new Date(this.viewYear, this.viewMonth, 1);
            // Monday-first: Mon=0..Sun=6
            const startOffset = (first.getDay() + 6) % 7;
            const daysInMonth = new Date(this.viewYear, this.viewMonth + 1, 0).getDate();
            const today = this.todayYmd();

            for (let i = 0; i < startOffset; i++) {
                out.push({ key: `empty-${i}`, day: null, empty: true });
            }
            for (let d = 1; d <= daysInMonth; d++) {
                const dateStr = `${this.viewYear}-${this.pad(this.viewMonth + 1)}-${this.pad(d)}`;
                const w = this.workouts[dateStr];
                let tag = null;
                if (w) {
                    if (w.has_strength && w.has_cardio) tag = 'both';
                    else if (w.has_strength)            tag = 'strength';
                    else if (w.has_cardio)              tag = 'cardio';
                    else                                 tag = 'rest';
                }
                out.push({
                    key: dateStr,
                    day: d,
                    date: dateStr,
                    future: dateStr > today,
                    today:  dateStr === today,
                    empty:  false,
                    tag,
                    hasNote: !!(w && w.notes),
                });
            }
            return out;
        },

        cellClass(cell) {
            if (cell.empty) return 'cal-cell cal-cell--empty';
            const today = cell.today ? ' cal-cell--today' : '';
            if (cell.future) return 'cal-cell cal-cell--future' + today;
            const tag = cell.tag || 'rest';
            return `cal-cell cal-cell--${tag}${today}`;
        },

        // -------- Day modal --------
        openDay(dateStr) {
            this.selectedDate = dateStr;
            this.dayMsg = '';
            const w = this.workouts[dateStr];
            if (w) {
                this.day = {
                    has_strength: !!w.has_strength,
                    has_cardio:   !!w.has_cardio,
                    duration_min: w.duration_min ?? '',
                    distance_km:  w.distance_km  ?? '',
                    calories:     w.calories     ?? '',
                    notes:        w.notes        ?? '',
                };
            } else {
                this.day = {
                    has_strength: false, has_cardio: false,
                    duration_min: '', distance_km: '', calories: '',
                    notes: '',
                };
            }
            this.showDayModal = true;
            this.refreshIcons();
        },

        get dayTitle() {
            if (!this.selectedDate) return '';
            const d = new Date(this.selectedDate + 'T00:00:00');
            const label = d.toLocaleDateString(undefined, {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            });
            return label + (this.selectedDate === this.todayYmd() ? ' (today)' : '');
        },

        get cardioStats() {
            const dur  = parseFloat(this.day.duration_min);
            const dist = parseFloat(this.day.distance_km);
            const cal  = parseFloat(this.day.calories);
            const parts = [];
            if (dur > 0 && dist > 0) parts.push(`Avg speed: ${(dist / (dur / 60)).toFixed(2)} km/h`);
            if (dur > 0 && cal  > 0) parts.push(`Burn rate: ${(cal / dur).toFixed(1)} kcal/min`);
            return parts.join(' · ');
        },

        _buildWorkout() {
            const hs = !!this.day.has_strength;
            const hc = !!this.day.has_cardio;
            const num = v => (v === '' || v === null || v === undefined) ? null : Number(v);
            const notes = (this.day.notes || '').trim() || null;
            return {
                date: this.selectedDate,
                has_strength: hs,
                has_cardio:   hc,
                duration_min: hc ? num(this.day.duration_min) : null,
                distance_km:  hc ? num(this.day.distance_km)  : null,
                calories:     hc ? num(this.day.calories)     : null,
                notes,
                updated_at:   this.nowIso(),
            };
        },

        async saveDay() {
            this.dayMsg = '';
            try {
                const w = this._buildWorkout();
                if (this.user) {
                    const data = await this.api('workout', { method: 'POST', body: w });
                    this.workouts = { ...this.workouts, [data.workout.date]: data.workout };
                } else {
                    this.localSet(w);
                    this.workouts = { ...this.workouts, [w.date]: w };
                }
                this.showDayModal = false;
                this.refreshIcons();
            } catch (e) {
                this.dayMsg = e.message;
            }
        },

        async deleteDay() {
            this.dayMsg = '';
            try {
                if (this.user) {
                    await this.api('delete_workout', { method: 'POST', body: { date: this.selectedDate } });
                } else {
                    this.localDelete(this.selectedDate);
                }
                const copy = { ...this.workouts };
                delete copy[this.selectedDate];
                this.workouts = copy;
                this.showDayModal = false;
                this.refreshIcons();
            } catch (e) {
                this.dayMsg = e.message;
            }
        },

        // -------- Profile / Auth --------
        openProfile() {
            this.authMsg = '';
            this.showProfileModal = true;
            this.refreshIcons();
        },

        async onSigninResponse(ev) {
            const xhr = ev.detail && ev.detail.xhr;
            if (!xhr) return;
            if (!ev.detail.successful || xhr.status < 200 || xhr.status >= 300) {
                let err = 'Sign in failed';
                try { err = (JSON.parse(xhr.responseText).error) || err; } catch {}
                this.authMsg = err;
                return;
            }
            let data = {};
            try { data = JSON.parse(xhr.responseText); } catch {}
            this.user = data.email || null;
            if (!this.user) { this.authMsg = 'Sign in returned no user'; return; }
            try { await this.onAfterSignin(); }
            catch (e) { this.authMsg = e.message; }
        },

        async onSignupResponse(ev) {
            const xhr = ev.detail && ev.detail.xhr;
            if (!xhr) return;
            if (!ev.detail.successful || xhr.status < 200 || xhr.status >= 300) {
                let err = 'Sign up failed';
                try { err = (JSON.parse(xhr.responseText).error) || err; } catch {}
                this.authMsg = err;
                return;
            }
            let data = {};
            try { data = JSON.parse(xhr.responseText); } catch {}
            this.user = data.email || null;
            if (!this.user) { this.authMsg = 'Sign up returned no user'; return; }
            try { await this.onAfterSignup(); }
            catch (e) { this.authMsg = e.message; }
        },

        async onAfterSignup() {
            const localList = this.localList();
            if (localList.length > 0) {
                const sync = await this.api('sync', {
                    method: 'POST',
                    body: { workouts: localList, force: true },
                });
                this.localClear();
                const n = sync.workouts.length;
                this.signupNotice = `Saved ${n} day${n === 1 ? '' : 's'} from this browser to your new account.`;
                this.refreshIcons();
            }
            this.showProfileModal = false;
            await this.loadMonth();
        },

        async onAfterSignin() {
            const localList = this.localList();
            if (localList.length === 0) {
                this.showProfileModal = false;
                await this.loadMonth();
                return;
            }
            const remote = await this.api('workouts');
            const remoteList = remote.workouts || [];

            if (remoteList.length === 0) {
                await this.api('sync', {
                    method: 'POST',
                    body: { workouts: localList, force: true },
                });
                this.localClear();
                this.showProfileModal = false;
                await this.loadMonth();
                return;
            }

            this.showProfileModal = false;
            const choice = await this.askMergeChoice(localList, remoteList);
            let finalList;
            if      (choice === 'local')  finalList = localList;
            else if (choice === 'remote') finalList = remoteList;
            else                          finalList = this._mergeAdditive(localList, remoteList);

            await this.api('sync', {
                method: 'POST',
                body: { workouts: finalList, force: true },
            });
            this.localClear();
            await this.loadMonth();
        },

        _mergeAdditive(a, b) {
            const m = new Map();
            for (const w of a) m.set(w.date, w);
            for (const w of b) {
                const ex = m.get(w.date);
                if (!ex || (w.updated_at || '') > (ex.updated_at || '')) m.set(w.date, w);
            }
            return [...m.values()];
        },

        _listLatest(list) {
            let max = '';
            for (const w of list) if ((w.updated_at || '') > max) max = w.updated_at || '';
            return max;
        },

        _fmtTime(iso) {
            if (!iso) return '—';
            const d = new Date(iso);
            return isNaN(d.getTime()) ? '—' : d.toLocaleString();
        },

        askMergeChoice(localList, remoteList) {
            this.mergeLocal  = {
                count:   localList.length,
                updated: this._fmtTime(this._listLatest(localList)),
            };
            this.mergeRemote = {
                count:   remoteList.length,
                updated: this._fmtTime(this._listLatest(remoteList)),
            };
            this.showMergeModal = true;
            this.refreshIcons();
            return new Promise(resolve => { this._mergeResolve = resolve; });
        },

        resolveMerge(choice) {
            this.showMergeModal = false;
            const r = this._mergeResolve;
            this._mergeResolve = null;
            if (r) r(choice);
        },

        async signout() {
            if (!confirm('Sign out? Local data on this browser will be cleared. Your account data stays safe on the server.')) return;
            try { await this.api('signout', { method: 'POST' }); } catch {}
            this.user = null;
            this.workouts = {};
            this.localClear();
            this.showProfileModal = false;
            await this.loadMonth();
        },
    };
}

// Expose globally for Alpine's x-data="gymApp()".
window.gymApp = gymApp;
