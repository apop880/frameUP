<script>
    export let sections;

    let cssVarStyles='--columns:';
	
	$: {
        for(const item in sections) {
            console.log(sections[item].width);
            cssVarStyles = cssVarStyles + ' ' + sections[item].width;
        }
        console.log(cssVarStyles);
    }
</script>

<div class="view" style="{cssVarStyles}">
    {#each sections as section, index}
        <div class="section" style="justify-content:{section.justify}">
            {#each section.config as item, sIndex}
                <svelte:component this={item.card} config={item.config} delay={sIndex}/>
            {/each}
        </div>
    {/each}
</div>

<style>
    .view {
        display: grid;
        grid-auto-flow: column;
        column-gap: 10px;
        grid-template-columns: var(--columns);
        margin: 0 10px;
    }

    .section {
        display: grid;
        column-gap: 15px;
        row-gap: 10px;
        grid-auto-columns: max-content;
        grid-auto-rows: min-content;
    }
</style>