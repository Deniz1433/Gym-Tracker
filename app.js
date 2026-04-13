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
        inputBg: '#0b1220', inputText: '#f8fafc',
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
        inputBg: '#ffffff', inputText: '#0f172a',
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
        inputBg: '#1d2021', inputText: '#fbf1c7',
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
        inputBg: '#073642', inputText: '#fdf6e3',
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
        inputBg: '#21222c', inputText: '#f8f8f2',
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
        inputBg: '#242933', inputText: '#eceff4',
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
        inputBg: '#11111b', inputText: '#cdd6f4',
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
        inputBg: '#16161e', inputText: '#c0caf5',
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
    set('--c-input-text',  t.inputText  || t.textPri);
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

        currentPage:      'track',
        allWorkouts:      [],
        analyzeLoading:   false,
        _charts:          {},

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

        // -------- Page navigation --------
        async switchPage(page) {
            if (page === this.currentPage) return;
            if (this.currentPage === 'analyze') this.destroyCharts();
            this.currentPage = page;
            this.refreshIcons();
            if (page === 'analyze') await this.loadAnalyzeData();
        },

        async loadAnalyzeData() {
            this.analyzeLoading = true;
            try {
                if (this.user) {
                    const data = await this.api('workouts');
                    this.allWorkouts = data.workouts || [];
                } else {
                    this.allWorkouts = this.localList();
                }
            } catch (e) {
                console.error('loadAnalyzeData failed', e);
                this.allWorkouts = [];
            }
            this.analyzeLoading = false;
            this.$nextTick(() => { this.renderCharts(); this.refreshIcons(); });
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
            this._maybeRefreshCharts();
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
            this._maybeRefreshCharts();
        },

        resetColorOverride(kind) {
            this.settings.colorOverrides[kind] = null;
            this.applyTheme();
            this.saveSettings();
            this._maybeRefreshCharts();
        },

        resetAllOverrides() {
            this.settings.colorOverrides = { strength: null, cardio: null, both: null, rest: null };
            this.applyTheme();
            this.saveSettings();
            this._maybeRefreshCharts();
        },

        // -------- API helper --------
        async api(action, opts = {}) {
            const url = `api.php?action=${encodeURIComponent(action)}` +
                (opts.query ? '&' + new URLSearchParams(opts.query).toString() : '');
            const headers = { 'X-Requested-With': 'fetch' };
            const init = { method: opts.method || 'GET', credentials: 'same-origin', headers };
            if (opts.body !== undefined) {
                headers['Content-Type'] = 'application/json';
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

        // -------- Analysis computations --------
        get activeWorkouts() {
            return this.allWorkouts.filter(w => w.has_strength || w.has_cardio);
        },

        get totalWorkouts() {
            return this.activeWorkouts.length;
        },

        get analyzeStreaks() {
            const dates = this.activeWorkouts.map(w => w.date).sort();
            if (dates.length === 0) return { current: 0, longest: 0 };
            const dateSet = new Set(dates);
            const today = this.todayYmd();
            let current = 0;
            let check = new Date(today + 'T12:00:00');
            if (!dateSet.has(this.ymd(check))) check.setDate(check.getDate() - 1);
            while (dateSet.has(this.ymd(check))) {
                current++;
                check.setDate(check.getDate() - 1);
            }
            let longest = 0, run = 1;
            for (let i = 1; i < dates.length; i++) {
                const prev = new Date(dates[i - 1] + 'T12:00:00');
                const curr = new Date(dates[i] + 'T12:00:00');
                if (Math.round((curr - prev) / 86400000) === 1) run++;
                else { longest = Math.max(longest, run); run = 1; }
            }
            return { current, longest: Math.max(longest, run) };
        },

        get consistencyPct() {
            const today = new Date();
            const ago = new Date(today);
            ago.setDate(today.getDate() - 29);
            const from = this.ymd(ago), to = this.ymd(today);
            const count = this.activeWorkouts.filter(w => w.date >= from && w.date <= to).length;
            return Math.round((count / 30) * 100);
        },

        get typeSplit() {
            let strength = 0, cardio = 0, both = 0;
            for (const w of this.allWorkouts) {
                if (w.has_strength && w.has_cardio) both++;
                else if (w.has_strength) strength++;
                else if (w.has_cardio) cardio++;
            }
            return { strength, cardio, both };
        },

        get dayOfWeekCounts() {
            const counts = [0, 0, 0, 0, 0, 0, 0];
            for (const w of this.activeWorkouts) {
                const d = new Date(w.date + 'T12:00:00');
                counts[(d.getDay() + 6) % 7]++;
            }
            return counts;
        },

        get favoriteDayName() {
            const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
            const counts = this.dayOfWeekCounts;
            let maxIdx = 0;
            for (let i = 1; i < 7; i++) if (counts[i] > counts[maxIdx]) maxIdx = i;
            return counts[maxIdx] > 0 ? days[maxIdx] : '\u2014';
        },

        get weeklyActivity() {
            const today = new Date();
            const dow = today.getDay();
            const monday = new Date(today);
            monday.setDate(today.getDate() - ((dow + 6) % 7));
            monday.setHours(12, 0, 0, 0);
            const weeks = [];
            for (let i = 11; i >= 0; i--) {
                const start = new Date(monday);
                start.setDate(monday.getDate() - i * 7);
                const end = new Date(start);
                end.setDate(start.getDate() + 6);
                const s = this.ymd(start), e = this.ymd(end);
                const count = this.activeWorkouts.filter(w => w.date >= s && w.date <= e).length;
                weeks.push({ label: start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), count });
            }
            return weeks;
        },

        get hasCardioData() {
            return this.allWorkouts.some(w => w.has_cardio && (w.distance_km > 0 || w.duration_min > 0));
        },

        get cardioTrends() {
            return this.allWorkouts
                .filter(w => w.has_cardio && (w.distance_km > 0 || w.duration_min > 0))
                .sort((a, b) => a.date.localeCompare(b.date));
        },

        get monthlyComparison() {
            const now = new Date();
            const thisM = `${now.getFullYear()}-${this.pad(now.getMonth() + 1)}`;
            const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const lastM = `${prev.getFullYear()}-${this.pad(prev.getMonth() + 1)}`;
            const calc = prefix => {
                const ws = this.allWorkouts.filter(w => w.date.startsWith(prefix) && (w.has_strength || w.has_cardio));
                return {
                    workouts: ws.length,
                    strength: ws.filter(w => w.has_strength).length,
                    cardio: ws.filter(w => w.has_cardio).length,
                    distance: ws.reduce((s, w) => s + (w.distance_km || 0), 0),
                    calories: ws.reduce((s, w) => s + (w.calories || 0), 0),
                };
            };
            return { thisMonth: calc(thisM), lastMonth: calc(lastM) };
        },

        get monthlyComparisonTitle() {
            const names = ['January','February','March','April','May','June',
                           'July','August','September','October','November','December'];
            const now = new Date();
            return `${names[now.getMonth()]} vs ${names[now.getMonth() === 0 ? 11 : now.getMonth() - 1]}`;
        },

        get monthlyComparisonCards() {
            const mc = this.monthlyComparison;
            const card = (label, curr, prev, unit) => ({
                label, unit: unit || '',
                value: unit === 'km' ? curr.toFixed(1) : String(Math.round(curr)),
                prev: unit === 'km' ? prev.toFixed(1) : String(Math.round(prev)),
                up: curr > prev, down: curr < prev,
            });
            return [
                card('Workouts', mc.thisMonth.workouts, mc.lastMonth.workouts),
                card('Strength', mc.thisMonth.strength, mc.lastMonth.strength),
                card('Cardio', mc.thisMonth.cardio, mc.lastMonth.cardio),
                card('Calories', mc.thisMonth.calories, mc.lastMonth.calories, 'kcal'),
            ];
        },

        get personality() {
            const active = this.activeWorkouts;
            if (active.length === 0) return null;
            if (active.length < 5) return { icon: 'rocket', title: 'Rising Star', desc: 'Just getting started \u2014 keep building the habit!', color: 'var(--c-accent)' };
            const s = this.typeSplit;
            const total = s.strength + s.cardio + s.both;
            if (total === 0) return null;
            const streaks = this.analyzeStreaks;
            if (streaks.current >= 14) return { icon: 'flame', title: 'Unstoppable Force', desc: streaks.current + '-day streak and counting!', color: '#ef4444' };
            if (s.both > s.strength && s.both > s.cardio) return { icon: 'zap', title: 'Hybrid Beast', desc: 'You love mixing strength and cardio', color: 'var(--c-both)' };
            const sPct = (s.strength + s.both) / total;
            const cPct = (s.cardio + s.both) / total;
            if (sPct > 0.7) return { icon: 'dumbbell', title: 'Iron Warrior', desc: 'Strength training is your domain', color: 'var(--c-strength)' };
            if (cPct > 0.7) return { icon: 'heart-pulse', title: 'Endurance Machine', desc: 'Cardio is your calling', color: 'var(--c-cardio)' };
            return { icon: 'trophy', title: 'Complete Athlete', desc: 'A well-rounded mix of strength and cardio', color: 'var(--c-accent)' };
        },

        get milestones() {
            const active = this.activeWorkouts;
            const streaks = this.analyzeStreaks;
            const split = this.typeSplit;
            const ms = [];
            const add = (cond, icon, title) => ms.push({ icon, title, done: cond });
            add(active.length >= 1, 'dumbbell', 'First Workout');
            add(active.length >= 10, 'flame', '10 Sessions');
            add(active.length >= 50, 'star', 'Half Century');
            add(active.length >= 100, 'award', 'Century Club');
            add(streaks.longest >= 7, 'calendar-check', '7-Day Streak');
            add(streaks.longest >= 30, 'heart', '30-Day Streak');
            add(split.both >= 10, 'zap', 'Dual Threat');
            const monthCounts = {};
            for (const w of active) { const m = w.date.substring(0, 7); monthCounts[m] = (monthCounts[m] || 0) + 1; }
            add(Math.max(0, ...Object.values(monthCounts)) >= 20, 'trophy', 'Marathon Month');
            return ms;
        },

        // -------- Chart rendering --------
        _getThemeColors() {
            const s = getComputedStyle(document.documentElement);
            const g = k => s.getPropertyValue(k).trim();
            return {
                strength: g('--c-strength'), cardio: g('--c-cardio'), both: g('--c-both'),
                accent: g('--c-accent'), textSec: g('--c-text-sec'), textMut: g('--c-text-mut'),
                border: g('--c-border'),
            };
        },

        _maybeRefreshCharts() {
            if (this.currentPage === 'analyze' && this.totalWorkouts > 0) {
                this.$nextTick(() => { this.renderCharts(); this.refreshIcons(); });
            }
        },

        destroyCharts() {
            for (const k of Object.keys(this._charts)) {
                if (this._charts[k]) { this._charts[k].destroy(); delete this._charts[k]; }
            }
        },

        renderCharts() {
            if (typeof Chart === 'undefined') return;
            this.destroyCharts();
            const c = this._getThemeColors();
            Chart.defaults.color = c.textSec;
            Chart.defaults.borderColor = c.border;
            Chart.defaults.font.family = 'system-ui, sans-serif';
            this._renderTypeChart(c);
            this._renderDayChart(c);
            this._renderWeeklyChart(c);
            if (this.hasCardioData) this._renderCardioChart(c);
        },

        _chart(id, config) {
            const el = document.getElementById(id);
            if (!el) return;
            this._charts[id] = new Chart(el, config);
        },

        _renderTypeChart(c) {
            const s = this.typeSplit;
            if (s.strength + s.cardio + s.both === 0) return;
            this._chart('typeChart', {
                type: 'doughnut',
                data: {
                    labels: ['Strength', 'Cardio', 'Both'],
                    datasets: [{ data: [s.strength, s.cardio, s.both], backgroundColor: [c.strength, c.cardio, c.both], borderWidth: 0, hoverOffset: 6 }],
                },
                options: {
                    responsive: true, cutout: '62%',
                    plugins: { legend: { position: 'bottom', labels: { padding: 16, usePointStyle: true, pointStyleWidth: 10 } } },
                },
            });
        },

        _renderDayChart(c) {
            this._chart('dayChart', {
                type: 'bar',
                data: {
                    labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
                    datasets: [{ data: this.dayOfWeekCounts, backgroundColor: c.accent + 'cc', borderRadius: 6, borderSkipped: false }],
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, ticks: { stepSize: 1, precision: 0 }, grid: { color: c.border + '40' } },
                        x: { grid: { display: false } },
                    },
                },
            });
        },

        _renderWeeklyChart(c) {
            const w = this.weeklyActivity;
            this._chart('weeklyChart', {
                type: 'bar',
                data: {
                    labels: w.map(x => x.label),
                    datasets: [{ data: w.map(x => x.count), backgroundColor: c.accent + 'cc', borderRadius: 4, borderSkipped: false }],
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, max: 7, ticks: { stepSize: 1, precision: 0 }, grid: { color: c.border + '40' } },
                        x: { grid: { display: false }, ticks: { maxRotation: 45, minRotation: 0 } },
                    },
                },
            });
        },

        _renderCardioChart(c) {
            const t = this.cardioTrends;
            if (t.length < 2) return;
            const hasDist = t.some(w => w.distance_km > 0);
            const hasDur = t.some(w => w.duration_min > 0);
            const labels = t.map(w => new Date(w.date + 'T12:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
            const ds = [];
            if (hasDist) ds.push({
                label: 'Distance (km)', data: t.map(w => w.distance_km || 0),
                borderColor: c.cardio, backgroundColor: c.cardio + '20', fill: true, tension: 0.3, pointRadius: 3,
            });
            if (hasDur) ds.push({
                label: 'Duration (min)', data: t.map(w => w.duration_min || 0),
                borderColor: c.both, backgroundColor: c.both + '20', fill: true, tension: 0.3, pointRadius: 3,
                ...(hasDist ? { yAxisID: 'y1' } : {}),
            });
            const scales = {
                x: { grid: { display: false }, ticks: { maxTicksLimit: 8 } },
                y: { beginAtZero: true, grid: { color: c.border + '40' } },
            };
            if (hasDist && hasDur) scales.y1 = { position: 'right', beginAtZero: true, grid: { drawOnChartArea: false } };
            this._chart('cardioChart', {
                type: 'line', data: { labels, datasets: ds },
                options: {
                    responsive: true,
                    interaction: { mode: 'index', intersect: false },
                    plugins: { legend: { position: 'bottom', labels: { padding: 16, usePointStyle: true } } },
                    scales,
                },
            });
        },
    };
}

// Expose globally for Alpine's x-data="gymApp()".
window.gymApp = gymApp;
