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
                <svelte:component this={item.card} config={item.config} delay={25*sIndex}/>
            {/each}
        </div>
    {/each}
</div>

<style>
    .view {
        display: grid;
        grid-auto-flow: column;
        column-gap: 25px;
        grid-template-columns: var(--columns);
        margin: 10px;
    }

    .section {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-self: start;
    }
</style>