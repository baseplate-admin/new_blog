<script lang="ts">
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'
  import Card from './Card.svelte'

  export let post: {
    title: string
    date: string
    tags: string
    headings: {
      depth: number
      value: string
      id: string
    }[]

    slug: string
    isIndexFile: true
    preview: {
      html: string
      text: string
    }
    readingTime: string
    previous: {
      title: string
      date: string
      tags: 'string'
      headings: {
        depth: number
        value: string
        id: string
      }[]
      slug: string
      isIndexFile: boolean
      preview: {
        html: string
        text: string
      }
      readingTime: string
    }
  }

  let headings = post.headings

  onMount(() => {
    updateHeadings()
    setActiveHeading()
  })

  let activeHeading = headings[0]
  let elements: (HTMLElement | null)[] = new Array()

  function updateHeadings() {
    headings = post.headings

    elements = headings.map((heading) => {
      const x = document.getElementById(heading.id)
      return x
    })
  }
  const isInViewport = (targetElement: HTMLElement) => {
    const rect = targetElement.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  let activeArray: number[] = new Array()
  function setActiveHeading() {
    elements.forEach((item) => {
      if (isInViewport(item!)) {
        activeArray = [...activeArray, elements.indexOf(item!)]
      }
    })
    activeHeading = headings[Math.min(...activeArray)]
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
