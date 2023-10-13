<script lang="ts">
    import _0812310105101011 from "./0812310105101011.pdf";
    import _0812310205101001 from "./0812310205101001.pdf";
    const item = [_0812310205101001, _0812310105101011];
</script>

{#each item as i}
    <object
        class="h-64"
        data={i}
        title={String(i)}
    ></object>
{/each}
