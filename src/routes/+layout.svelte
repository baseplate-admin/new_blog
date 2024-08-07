<script lang="ts">
    import "../app.css";
    import { MoonIcon } from "heroicons-svelte/24/solid";
    import { SunIcon } from "heroicons-svelte/24/solid";
    import { browser } from "$app/environment";
    import { name } from "$lib/info";
    import { page } from "$app/stores";
    import { dev } from "$app/environment";
    import { inject } from "@vercel/analytics";
    import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";

    // Vercel specific
    inject({ mode: dev ? "development" : "production" });
    injectSpeedInsights();

    let isDarkMode = browser ? Boolean(document.documentElement.classList.contains("dark")) : true;

    function disableTransitionsTemporarily() {
        document.documentElement.classList.add("[&_*]:!transition-none");
        window.setTimeout(() => {
            document.documentElement.classList.remove("[&_*]:!transition-none");
        }, 0);
    }
</script>

<div class="h-full bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400">
    <div class="flex flex-col min-h-screen">
        <div class="flex flex-col flex-grow w-full px-4 py-2">
            <header class="flex items-center justify-between w-full max-w-2xl py-4 mx-auto lg:pb-8">
                <a
                    class="text-lg font-bold sm:text-2xl !text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-600 dark:to-teal-400"
                    href="/"
                >
                    {name}
                </a>

                <button
                    type="button"
                    role="switch"
                    aria-label="Toggle Dark Mode"
                    aria-checked={isDarkMode}
                    class="w-5 h-5 sm:h-8 sm:w-8 sm:p-1"
                    on:click={() => {
                        isDarkMode = !isDarkMode;
                        localStorage.setItem("isDarkMode", isDarkMode.toString());

                        disableTransitionsTemporarily();

                        if (isDarkMode) {
                            document?.querySelector("html")?.classList.add("dark");
                        } else {
                            document?.querySelector("html")?.classList.remove("dark");
                        }
                    }}
                >
                    <MoonIcon class="hidden text-zinc-500 dark:block" />
                    <SunIcon class="block text-zinc-400 dark:hidden" />
                </button>
            </header>
            <div
                class="flex flex-col flex-grow w-full mx-auto"
                class:max-w-2xl={!$page.data.layout?.fullWidth}
            >
                <slot />
            </div>
        </div>
    </div>
</div>
