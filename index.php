<?php
declare(strict_types=1);
// Trigger DB init on first hit so the schema exists before any API call.
require __DIR__ . '/db.php';
db();
?>
<!doctype html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gym Tracker</title>
<link rel="icon" type="image/svg+xml" href="favicon.svg">

<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Lucide icons -->
<script src="https://unpkg.com/lucide@0.454.0/dist/umd/lucide.min.js"></script>

<!-- HTMX + json-enc extension -->
<script src="https://unpkg.com/htmx.org@2.0.4/dist/htmx.min.js"></script>
<script src="https://unpkg.com/htmx-ext-json-enc@2.0.2/json-enc.js"></script>

<!-- Alpine.js (defer so gymApp() is defined first; app.js IIFE applies theme synchronously) -->
<script src="app.js"></script>
<script defer src="https://unpkg.com/alpinejs@3.14.3/dist/cdn.min.js"></script>

<style>
    /* ----- Default theme variables (Dark) — JS may overwrite at load ----- */
    :root {
        --c-page:        #0f172a;
        --c-surface:     #1e293b;
        --c-elev:        #334155;
        --c-elev-hover:  #475569;
        --c-topbar:      #0b1220;
        --c-topbar-text: #f1f5f9;
        --c-text-pri:    #f1f5f9;
        --c-text-sec:    #cbd5e1;
        --c-text-mut:    #64748b;
        --c-border:      #334155;
        --c-overlay:     rgba(0, 0, 0, 0.7);
        --c-btn-hover:   rgba(255, 255, 255, 0.08);
        --c-accent:      #38bdf8;
        --c-accent-text: #0c1e2e;
        --c-accent-hover:#7dd3fc;
        --c-input-text:  #f8fafc;
        --c-strength:    #ea580c;
        --c-strength-text:#ffedd5;
        --c-cardio:      #0284c7;
        --c-cardio-text: #e0f2fe;
        --c-both:        #16a34a;
        --c-both-text:   #dcfce7;
        --c-rest:        #1e293b;
        --c-rest-text:   #94a3b8;
        --c-future:      #172033;
        --c-future-text: #475569;
        --c-today-ring:  #60a5fa;
    }

    [x-cloak] { display: none !important; }

    /* Tell browser UA (scrollbars, spin buttons, date pickers, autofill, etc.)
       which color scheme to render with. */
    :root                       { color-scheme: dark; }
    [data-theme="light"]        { color-scheme: light; }

    html, body {
        background-color: var(--c-page);
        color:            var(--c-text-pri);
    }

    /* ----- Theme utility classes ----- */
    .bg-page        { background-color: var(--c-page); }
    .bg-surface     { background-color: var(--c-surface); }
    .bg-elev        { background-color: var(--c-elev); }
    .bg-elev:hover  { background-color: var(--c-elev-hover); }
    .bg-topbar      { background-color: var(--c-topbar); }
    .bg-overlay     { background-color: var(--c-overlay); }
    .text-pri       { color: var(--c-text-pri); }
    .text-sec       { color: var(--c-text-sec); }
    .text-mut       { color: var(--c-text-mut); }
    .text-topbar    { color: var(--c-topbar-text); }
    .border-th      { border-color: var(--c-border) !important; }
    .bg-accent      { background-color: var(--c-accent); }
    .bg-accent:hover{ background-color: var(--c-accent-hover); }
    .text-accent-fg { color: var(--c-accent-text); }
    .ring-accent    { box-shadow: 0 0 0 2px var(--c-accent); }

    /* ----- Generic form control styling, theme-aware ----- */
    /* Input text is always white, except on the light theme where it's black.
       !important is needed because Tailwind CDN injects its preflight
       (`button, input, ... { color: inherit; }`) at the same specificity and
       loads after this <style> block, so it wins the cascade tie otherwise. */
    input, select, textarea {
        background-color: var(--c-elev);
        color:            #ffffff !important;
        border:           1px solid var(--c-border);
        border-radius:    0.375rem;
        padding:          0.625rem 0.875rem;
        font:             inherit;
    }
    [data-theme="light"] input,
    [data-theme="light"] select,
    [data-theme="light"] textarea {
        color: #000000 !important;
    }
    input::placeholder, textarea::placeholder {
        color: #ffffff;
        opacity: 0.45;
    }
    [data-theme="light"] input::placeholder,
    [data-theme="light"] textarea::placeholder {
        color: #000000;
        opacity: 0.45;
    }
    select { padding-right: 2rem; }
    textarea { padding: 0.625rem 0.875rem; }
    input:focus, select:focus, textarea:focus {
        outline: 2px solid var(--c-accent);
        outline-offset: -1px;
        border-color: var(--c-accent);
    }
    input[type="checkbox"] {
        accent-color: var(--c-accent);
        width: 1rem; height: 1rem; padding: 0;
    }
    input[type="color"] {
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
        border: 1px solid var(--c-border);
        border-radius: 0.375rem;
        padding: 0;
        cursor: pointer;
        width: 2.5rem;
        height: 2.5rem;
    }
    input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
    input[type="color"]::-webkit-color-swatch { border: none; border-radius: 0.25rem; }
    input[type="color"]::-moz-color-swatch    { border: none; border-radius: 0.25rem; }

    /* ----- Header icon-button hover ----- */
    .btn-icon { padding: 0.375rem; border-radius: 9999px; transition: background-color 0.15s; color: var(--c-topbar-text); }
    .btn-icon:hover { background-color: var(--c-btn-hover); }

    /* ----- Calendar cells ----- */
    .cal-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 4px;
        background-color: var(--c-border);
        padding: 4px;
        border-radius: 0.5rem;
    }
    .cal-dow {
        background-color: var(--c-elev);
        color: var(--c-text-sec);
        text-align: center;
        font-weight: 600;
        font-size: 0.75rem;
        padding: 4px 0;
    }
    @media (min-width: 640px) {
        .cal-dow { font-size: 0.875rem; }
    }
    .cal-cell {
        aspect-ratio: 1 / 1;
        padding: 0.25rem;
        border: 2px solid transparent;
        border-radius: 0.25rem;
        position: relative;
        cursor: pointer;
        transition: filter 0.15s ease;
        font-weight: 700;
        font-size: 0.75rem;
        min-height: 0;
    }
    @media (min-width: 640px) {
        .cal-cell { padding: 0.375rem; font-size: 0.875rem; }
    }
    .cal-cell:not(.cal-cell--future):not(.cal-cell--empty):hover { filter: brightness(1.18); }
    .cal-cell--rest     { background-color: var(--c-rest);     color: var(--c-rest-text); }
    .cal-cell--strength { background-color: var(--c-strength); color: var(--c-strength-text); }
    .cal-cell--cardio   { background-color: var(--c-cardio);   color: var(--c-cardio-text); }
    .cal-cell--both     { background-color: var(--c-both);     color: var(--c-both-text); }
    .cal-cell--future   { background-color: var(--c-future);   color: var(--c-future-text); cursor: not-allowed; }
    .cal-cell--empty    { background-color: transparent; cursor: default; }
    .cal-cell--today    { border-color: var(--c-today-ring); box-shadow: 0 0 0 1px var(--c-today-ring); }

    .cal-cell-inner { position: relative; width: 100%; height: 100%; }
    .cal-cell-day   { position: absolute; top: 0; left: 0; line-height: 1; }
    .cal-cell-icons {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1px;
        pointer-events: none;
        opacity: 0.55;
    }
    .cal-cell-icons svg { width: 14px; height: 14px; }
    @media (min-width: 640px) {
        .cal-cell-icons svg { width: 16px; height: 16px; }
    }
    .cal-cell-note {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 12px;
        height: 12px;
        opacity: 0.75;
    }
    @media (min-width: 640px) {
        .cal-cell-note { width: 14px; height: 14px; }
    }
</style>
</head>

<body class="min-h-screen antialiased"
      x-data="gymApp()" x-init="init()" x-cloak>

<!-- ============ Header ============ -->
<header class="bg-topbar text-topbar shadow-md">
    <div class="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 class="text-lg sm:text-xl font-semibold flex items-center gap-2">
            <i data-lucide="dumbbell" class="w-6 h-6"></i>
            Gym Tracker
        </h1>
        <div class="flex items-center gap-1">
            <button @click="openSettings()" class="btn-icon" aria-label="Settings">
                <i data-lucide="settings" class="w-6 h-6"></i>
            </button>
            <button @click="openProfile()" class="btn-icon relative"
                    :aria-label="user ? 'Account (signed in)' : 'Sign in or sign up'">
                <i data-lucide="circle-user-round" class="w-7 h-7"></i>
                <span x-show="user"
                      class="absolute bottom-1 right-1 block w-2.5 h-2.5 rounded-full bg-emerald-400"
                      style="box-shadow: 0 0 0 2px var(--c-topbar);"
                      aria-hidden="true"></span>
            </button>
        </div>
    </div>
</header>

<!-- ============ Calendar ============ -->
<main class="max-w-3xl mx-auto p-4">
    <div class="flex items-center justify-between mb-3">
        <button @click="prevMonth()"
                class="p-2 rounded text-pri transition"
                style="--tw-bg-opacity: 0;"
                onmouseover="this.style.backgroundColor='var(--c-elev)'"
                onmouseout="this.style.backgroundColor='transparent'"
                aria-label="Previous month">
            <i data-lucide="chevron-left" class="w-5 h-5"></i>
        </button>
        <h2 class="text-lg font-semibold text-pri" x-text="monthLabel"></h2>
        <button @click="nextMonth()"
                class="p-2 rounded text-pri transition"
                onmouseover="this.style.backgroundColor='var(--c-elev)'"
                onmouseout="this.style.backgroundColor='transparent'"
                aria-label="Next month">
            <i data-lucide="chevron-right" class="w-5 h-5"></i>
        </button>
    </div>

    <div class="cal-grid">
        <template x-for="d in ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']" :key="d">
            <div class="cal-dow" x-text="d"></div>
        </template>
        <template x-for="cell in cells" :key="cell.key">
            <div :class="cellClass(cell)"
                 @click="cell.day && !cell.future && openDay(cell.date)">
                <template x-if="cell.day">
                    <div class="cal-cell-inner">
                        <span class="cal-cell-day" x-text="cell.day"></span>
                        <template x-if="settings.showCellIcons && cell.tag && cell.tag !== 'rest'">
                            <div class="cal-cell-icons">
                                <template x-if="cell.tag === 'strength' || cell.tag === 'both'">
                                    <i data-lucide="dumbbell"></i>
                                </template>
                                <template x-if="cell.tag === 'cardio' || cell.tag === 'both'">
                                    <i data-lucide="footprints"></i>
                                </template>
                            </div>
                        </template>
                        <template x-if="cell.hasNote">
                            <i data-lucide="sticky-note" class="cal-cell-note"></i>
                        </template>
                    </div>
                </template>
            </div>
        </template>
    </div>

    <div class="mt-3 text-xs text-mut flex flex-wrap gap-x-4 gap-y-1">
        <span class="flex items-center gap-1.5">
            <span class="inline-block w-3 h-3 rounded-sm" style="background-color: var(--c-rest)"></span>Rest
        </span>
        <span class="flex items-center gap-1.5">
            <span class="inline-block w-3 h-3 rounded-sm" style="background-color: var(--c-strength)"></span>Strength
        </span>
        <span class="flex items-center gap-1.5">
            <span class="inline-block w-3 h-3 rounded-sm" style="background-color: var(--c-cardio)"></span>Cardio
        </span>
        <span class="flex items-center gap-1.5">
            <span class="inline-block w-3 h-3 rounded-sm" style="background-color: var(--c-both)"></span>Both
        </span>
    </div>
</main>

<!-- ============ Day modal ============ -->
<div x-show="showDayModal" x-transition.opacity
     @keydown.escape.window="showDayModal=false"
     class="fixed inset-0 bg-overlay flex items-center justify-center p-4 z-40"
     @click.self="showDayModal=false">
    <div class="bg-surface text-pri rounded-xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-start mb-4">
            <div>
                <h3 class="text-lg font-semibold" x-text="dayTitle"></h3>
                <p class="text-xs text-mut mt-0.5" x-show="!user">Saved locally in this browser</p>
                <p class="text-xs text-mut mt-0.5" x-show="user">Synced to your account</p>
            </div>
            <button @click="showDayModal=false" class="btn-icon" style="color: var(--c-text-pri)" aria-label="Close">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>

        <fieldset class="border border-th rounded-lg p-3 mb-3">
            <legend class="px-2 text-sm font-semibold text-sec">Workout type</legend>
            <div class="flex justify-center gap-8">
                <label class="inline-flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" x-model="day.has_strength">
                    <i data-lucide="dumbbell" class="w-4 h-4"></i>
                    <span class="text-sm">Strength</span>
                </label>
                <label class="inline-flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" x-model="day.has_cardio">
                    <i data-lucide="footprints" class="w-4 h-4"></i>
                    <span class="text-sm">Cardio</span>
                </label>
            </div>
        </fieldset>

        <fieldset x-show="day.has_cardio" x-transition class="border border-th rounded-lg p-3 mb-3">
            <legend class="px-2 text-sm font-semibold text-sec">Cardio details (optional)</legend>
            <div class="grid grid-cols-3 gap-2">
                <label class="block text-xs text-mut">
                    Duration (min)
                    <input type="number" min="0" step="any" x-model="day.duration_min" class="mt-1 w-full text-sm">
                </label>
                <label class="block text-xs text-mut">
                    Distance (km)
                    <input type="number" min="0" step="any" x-model="day.distance_km" class="mt-1 w-full text-sm">
                </label>
                <label class="block text-xs text-mut">
                    Calories (kcal)
                    <input type="number" min="0" step="any" x-model="day.calories" class="mt-1 w-full text-sm">
                </label>
            </div>
            <p class="text-xs text-sec mt-2 font-medium min-h-[1rem]" x-text="cardioStats"></p>
        </fieldset>

        <label class="block mb-4">
            <span class="text-sm font-semibold text-sec">Notes</span>
            <textarea rows="3" x-model="day.notes"
                      placeholder="How did it feel? PRs? Anything to remember…"
                      class="mt-1 w-full text-sm"></textarea>
        </label>

        <div class="flex flex-wrap gap-2">
            <button type="button" @click="saveDay()"
                    class="bg-accent text-accent-fg px-4 py-2 rounded font-medium flex items-center gap-1.5 transition">
                <i data-lucide="save" class="w-4 h-4"></i> Save
            </button>
            <button type="button" @click="deleteDay()"
                    class="bg-red-600 text-white px-4 py-2 rounded font-medium flex items-center gap-1.5 transition hover:bg-red-500">
                <i data-lucide="trash-2" class="w-4 h-4"></i> Clear day
            </button>
            <button type="button" @click="showDayModal=false"
                    class="bg-elev text-pri px-4 py-2 rounded font-medium transition">
                Cancel
            </button>
        </div>
        <p class="text-red-500 text-sm mt-2 min-h-[1.25rem]" x-text="dayMsg"></p>
    </div>
</div>

<!-- ============ Profile / Auth modal ============ -->
<div x-show="showProfileModal" x-transition.opacity
     @keydown.escape.window="showProfileModal=false"
     class="fixed inset-0 bg-overlay flex items-center justify-center p-4 z-40"
     @click.self="showProfileModal=false">
    <div class="bg-surface text-pri rounded-xl shadow-2xl w-full max-w-md p-6">

        <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold flex items-center gap-2">
                <i data-lucide="circle-user-round" class="w-5 h-5"></i>
                <span x-text="user ? 'Account' : 'Sign in or sign up'"></span>
            </h3>
            <button @click="showProfileModal=false" class="btn-icon" style="color: var(--c-text-pri)" aria-label="Close">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>

        <div x-show="!user">
                <form method="post"
                      action="api.php?action=signin"
                      @submit.prevent
                      autocomplete="on"
                      hx-post="api.php?action=signin"
                      hx-ext="json-enc"
                      hx-swap="none"
                      x-on:htmx:after-request="onSigninResponse($event)"
                      class="space-y-3">
                    <label class="block text-sm">
                        <span class="font-medium text-sec">Email</span>
                        <input type="email" name="email" required autocomplete="email" class="mt-1 w-full">
                    </label>
                    <label class="block text-sm">
                        <span class="font-medium text-sec">Password</span>
                        <input type="password" name="password" required minlength="8" autocomplete="current-password" class="mt-1 w-full">
                    </label>
                    <div class="flex gap-2 flex-wrap">
                        <button type="submit"
                                class="bg-accent text-accent-fg px-4 py-2 rounded font-medium flex items-center gap-1.5 transition">
                            <i data-lucide="log-in" class="w-4 h-4"></i> Sign in
                        </button>
                        <button type="button"
                                hx-post="api.php?action=signup"
                                hx-include="closest form"
                                hx-swap="none"
                                hx-validate="true"
                                x-on:htmx:after-request.stop="onSignupResponse($event)"
                                class="bg-elev text-pri px-4 py-2 rounded font-medium flex items-center gap-1.5 transition">
                            <i data-lucide="user-plus" class="w-4 h-4"></i> Sign up
                        </button>
                    </div>
                </form>
                <p class="text-red-500 text-sm mt-2 min-h-[1.25rem]" x-text="authMsg"></p>
                <p class="text-xs text-mut mt-3">
                    You can use the app without an account — your data is saved in this browser.
                    Sign up to keep it and sync across devices.
                </p>
        </div>

        <div x-show="user" class="space-y-4">
                <div class="bg-elev border border-th rounded-lg p-3 text-sm">
                    Signed in as <span class="font-semibold" x-text="user"></span>
                </div>
                <button type="button" @click="signout()"
                        class="bg-red-600 text-white px-4 py-2 rounded font-medium flex items-center gap-1.5 transition hover:bg-red-500">
                    <i data-lucide="log-out" class="w-4 h-4"></i> Sign out
                </button>
                <p class="text-xs text-mut">
                    Signing out clears local data on this browser. Your account data stays safe on the server.
                </p>
        </div>
    </div>
</div>

<!-- ============ Settings modal ============ -->
<div x-show="showSettingsModal" x-transition.opacity
     @keydown.escape.window="showSettingsModal=false"
     class="fixed inset-0 bg-overlay flex items-center justify-center p-4 z-40"
     @click.self="showSettingsModal=false">
    <div class="bg-surface text-pri rounded-xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold flex items-center gap-2">
                <i data-lucide="settings" class="w-5 h-5"></i>
                Settings
            </h3>
            <button @click="showSettingsModal=false" class="btn-icon" style="color: var(--c-text-pri)" aria-label="Close">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>

        <!-- Theme -->
        <label class="block mb-4">
            <span class="text-sm font-semibold text-sec">Theme</span>
            <select x-model="settings.theme" @change="onThemeChange()" class="mt-1 w-full">
                <template x-for="(t, key) in themes" :key="key">
                    <option :value="key" x-text="t.name"></option>
                </template>
            </select>
        </label>

        <!-- Show icons toggle -->
        <label class="flex items-center gap-2 cursor-pointer mb-4">
            <input type="checkbox" x-model="settings.showCellIcons" @change="onIconsToggle()">
            <span class="text-sm">Show workout type icons on calendar squares</span>
        </label>

        <!-- Workout colors -->
        <fieldset class="border border-th rounded-lg p-3 mb-3">
            <legend class="px-2 text-sm font-semibold text-sec">Workout colors</legend>
            <p class="text-xs text-mut mb-2">Custom picks override the theme.</p>
            <template x-for="kind in ['strength','cardio','both','rest']" :key="kind">
                <div class="flex items-center justify-between py-1.5">
                    <span class="text-sm capitalize" x-text="kind"></span>
                    <div class="flex items-center gap-2">
                        <input type="color"
                               :value="effectiveColor(kind)"
                               @input="setColorOverride(kind, $event.target.value)">
                        <button type="button"
                                @click="resetColorOverride(kind)"
                                :disabled="!settings.colorOverrides[kind]"
                                class="text-xs px-2 py-1 rounded border border-th text-sec disabled:opacity-30 disabled:cursor-not-allowed transition"
                                onmouseover="if(!this.disabled) this.style.backgroundColor='var(--c-elev)'"
                                onmouseout="this.style.backgroundColor='transparent'">
                            Reset
                        </button>
                    </div>
                </div>
            </template>
        </fieldset>

        <button type="button" @click="resetAllOverrides()"
                class="text-xs text-sec hover:text-pri underline">
            Reset all colors to theme defaults
        </button>
    </div>
</div>

<!-- ============ Merge modal ============ -->
<div x-show="showMergeModal" x-transition.opacity
     class="fixed inset-0 bg-overlay flex items-center justify-center p-4 z-50">
    <div class="bg-surface text-pri rounded-xl shadow-2xl w-full max-w-lg p-6">
        <h3 class="text-lg font-semibold mb-2 flex items-center gap-2">
            <i data-lucide="triangle-alert" class="w-5 h-5 text-amber-400"></i>
            You already have data on this account
        </h3>
        <p class="text-sm text-sec mb-4">
            This browser has unsynced data and your account also has saved data.
            Choose what to do — this can't be undone.
        </p>
        <div class="overflow-hidden border border-th rounded-lg mb-4">
            <table class="w-full text-sm">
                <thead>
                    <tr class="bg-elev text-sec">
                        <th class="text-left p-2"></th>
                        <th class="text-left p-2">Logged days</th>
                        <th class="text-left p-2">Last updated</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-t border-th">
                        <th class="text-left p-2 font-semibold">This browser (local)</th>
                        <td class="p-2" x-text="mergeLocal.count"></td>
                        <td class="p-2" x-text="mergeLocal.updated"></td>
                    </tr>
                    <tr class="border-t border-th">
                        <th class="text-left p-2 font-semibold">Your account (remote)</th>
                        <td class="p-2" x-text="mergeRemote.count"></td>
                        <td class="p-2" x-text="mergeRemote.updated"></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex flex-wrap gap-2">
            <button type="button" @click="resolveMerge('local')"
                    class="bg-accent text-accent-fg px-3 py-2 rounded text-sm font-medium transition">
                Use local (overwrite account)
            </button>
            <button type="button" @click="resolveMerge('remote')"
                    class="bg-accent text-accent-fg px-3 py-2 rounded text-sm font-medium transition">
                Use account (discard local)
            </button>
            <button type="button" @click="resolveMerge('merge')"
                    class="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded text-sm font-medium transition">
                Merge both (additive)
            </button>
        </div>
        <p class="text-xs text-mut mt-3">
            Merge keeps every day from both sides. If the same day exists in both, the more recently edited version wins.
        </p>
    </div>
</div>

<!-- ============ Signup import notice ============ -->
<div x-show="signupNotice" x-transition.opacity
     class="fixed inset-0 bg-overlay flex items-center justify-center p-4 z-50"
     @click.self="signupNotice=''">
    <div class="bg-surface text-pri rounded-xl shadow-2xl w-full max-w-sm p-6">
        <h3 class="text-lg font-semibold mb-2 flex items-center gap-2">
            <i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-400"></i>
            Welcome!
        </h3>
        <p class="text-sm text-sec mb-4" x-text="signupNotice"></p>
        <button type="button" @click="signupNotice=''"
                class="bg-accent text-accent-fg px-4 py-2 rounded font-medium transition">
            OK
        </button>
    </div>
</div>

</body>
</html>
