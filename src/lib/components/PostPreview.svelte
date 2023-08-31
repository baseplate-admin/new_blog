<script lang="ts">
    import Card from "./Card.svelte";
    import ArrowRightIcon from "./ArrowRightIcon.svelte";

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
</script>

<Card href={`/post/${post.slug}`}>
    <slot
        slot="eyebrow"
        name="eyebrow"
    />
    <slot slot="title">{post.title}</slot>
    <div
        slot="description"
        class="prose dark:prose-invert"
    >
        {@html post.preview.html}
    </div>
    <div slot="actions">
        <div class="flex items-center text-teal-500">
            <span class="text-sm font-medium">Read</span>
            <ArrowRightIcon class="w-4 h-4 ml-1" />
        </div>
    </div>
</Card>

<style>
    .prose > :global(p) {
        margin-top: 0;
        margin-bottom: 0;
    }
</style>
