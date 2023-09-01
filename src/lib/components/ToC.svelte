<script lang="ts">
    import { beforeUpdate, onMount } from "svelte";
    import Card from "./Card.svelte";
    import { browser } from "$app/environment";

    export let post: {
        title: string;
        date: string;
        tags: string;
        headings: {
            depth: number;
            value: string;
            id: string;
        }[];

        slug: string;
        isIndexFile: true;
        preview: {
            html: string;
            text: string;
        };
        readingTime: string;
        previous: {
            title: string;
            date: string;
            tags: "string";
            headings: {
                depth: number;
                value: string;
                id: string;
            }[];
            slug: string;
            isIndexFile: boolean;
            preview: {
                html: string;
                text: string;
            };
            readingTime: string;
        };
    };
    beforeUpdate(() => {
        updateHeadings();
    });
    onMount(() => {
        setActiveHeading();
    });

    let headings = post.headings,
        activeHeading = headings[0],
        elements: HTMLElement[] = new Array();

    const updateHeadings = () => {
        headings = post.headings;
        headings.forEach((item) => {
            const heading_element = document.getElementById(item.id);
            if (heading_element) elements = [...new Set([...elements, heading_element])];
        });
    };

    let activeArray: number[] = new Array();
    let prevScrollY = 0,
        scrollDirection = "up";
    let intersection_index: Record<number, boolean> = {};

    const options = {
        root: null,
        threshold: 0.2
    };
    const callback = function (entries: any[], observer: any) {
        entries.forEach((entry) => {
            intersection_index[elements.indexOf(entry.target)] = entry.isIntersecting;
        });
    };
    let observer = browser && new IntersectionObserver(callback, options);

    let largest_true_key: number;

    $: console.log(largest_true_key);

    function setActiveHeading() {
        elements.forEach((item) => {
            (observer as IntersectionObserver).observe(item);
        });
        const true_keys = Object.keys(intersection_index)
            .filter((key) => intersection_index[Number(key)] === true)
            .map((str) => Number(str));

        if (true_keys.length > 0) {
            largest_true_key = Math.max(...true_keys);
        }

        const scrollY = window.scrollY;
        const newScrollDirection = scrollY > prevScrollY ? "down" : "up";
        prevScrollY = scrollY;
        scrollDirection = newScrollDirection;

        if (scrollDirection === "up") {
            if (true_keys.length === 0) {
                activeHeading = headings[largest_true_key - 1];
            } else {
                activeHeading = headings[Math.min(...true_keys)];
            }
        } else if (scrollDirection === "down") {
            if (true_keys.length === 0) {
                activeHeading = headings[largest_true_key];
            } else {
                activeHeading = headings[Math.max(...true_keys)];
            }
        }
    }
</script>

<svelte:window on:scroll={setActiveHeading} />

<Card>
    <slot slot="description">
        <ul class="flex flex-col gap-2">
            {#each headings as heading}
                <li
                    class="pl-2 transition-colors border-teal-500 heading text-zinc-500 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100"
                    class:active={activeHeading === heading}
                    style={`--depth: ${
                        // consider h1 and h2 at the same depth, as h1 will only be used for page title
                        Math.max(0, heading.depth - 1)
                    }`}
                >
                    <div class="ml-2"><a href={`#${heading.id}`}>{heading.value}</a></div>
                </li>
            {/each}
        </ul>
    </slot>
</Card>

<style lang="postcss">
    .heading {
        padding-left: calc(var(--depth, 0) * 0.35rem);
    }

    .active {
        @apply font-medium text-slate-900 border-l-2 -ml-[2px];
    }

    /* can't use dark: modifier in @apply */
    :global(.dark) .active {
        @apply text-slate-100;
    }
</style>
