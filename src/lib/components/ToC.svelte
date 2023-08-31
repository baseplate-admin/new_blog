<script lang="ts">
    import { onMount } from "svelte";
    import Card from "./Card.svelte";

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

    onMount(() => {
        updateHeadings();
        setActiveHeading();
    });

    let headings = post.headings,
        activeHeading = headings[0],
        elements: HTMLElement[] = new Array();

    const updateHeadings = () => {
        headings = post.headings;

        headings.forEach((item) => {
            elements = [...elements, document.getElementById(item.id)!];
        });
    };
    const isInViewport = (targetElement: HTMLElement) => {
        const rect = targetElement.getBoundingClientRect();
        return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    };

    let activeArray: number[] = new Array();
    let prevScrollY = 0,
        scrollDirection = "up";

    function setActiveHeading() {
        let new_arr: number[] = [];

        elements.forEach((item) => {
            if (isInViewport(item!)) {
                new_arr = [...new_arr, elements.indexOf(item!)];
            }
        });

        if (new_arr.length > 0) {
            activeArray = [...new_arr];
        }

        const scrollY = window.scrollY;
        const newScrollDirection = scrollY > prevScrollY ? "down" : "up";
        prevScrollY = scrollY;
        scrollDirection = newScrollDirection;
        if (scrollDirection === "up") {
            activeHeading = headings[Math.min(...activeArray)];
        } else if (scrollDirection === "down") {
            activeHeading = headings[Math.max(...activeArray)];
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
