<script lang="ts">
    import { beforeUpdate, onMount } from "svelte";
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

    function getClosestNumber(d: number, array: Array<number>) {
        return array.reduce((a, b) => (b <= d && a < b ? b : a), 0);
    }
    // https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
    function isInViewport(element: HTMLElement) {
        const rect = element.getBoundingClientRect();
        return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    }

    let skip_scroll = false;
    beforeUpdate(() => {
        updateHeadings();
        distance_from_elements = elements.map((item) => {
            return item.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
        });
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

    let distance_from_elements: Array<number>;
    let prevScrollY = 0,
        scrollDirection = "up";

    const setActiveHeading = () => {
        if (skip_scroll) {
            return;
        }
        // There's no elements
        if (elements.length === 0) {
            return;
        }

        const scrollY = window.scrollY,
            newScrollDirection = scrollY > prevScrollY ? "down" : "up";
        prevScrollY = scrollY;
        scrollDirection = newScrollDirection;

        // Side Effect
        if (scrollDirection === "up") {
            if (isInViewport(elements.at(-1)!)) {
                activeHeading = headings.at(-1)!;
                return;
            }
        } else if (scrollDirection === "down") {
            if (isInViewport(elements.at(0)!)) {
                activeHeading = headings.at(0)!;
                return;
            }
        }

        const active_number = getClosestNumber(window.pageYOffset, distance_from_elements);
        activeHeading = headings[distance_from_elements.indexOf(active_number)];
    };
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
                    <div class="ml-2">
                        <a
                            on:click={(e) => {
                                skip_scroll = true;
                                activeHeading = heading;
                                setTimeout(() => {
                                    skip_scroll = false;
                                }, 100);
                            }}
                            href={`#${heading.id}`}
                        >
                            {heading.value}
                        </a>
                    </div>
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
