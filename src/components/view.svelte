<script>
    import Grid from "svelte-grid";
    import gridHelp from "svelte-grid/build/helper/index.mjs";

    import { fade } from 'svelte/transition';

    import Light from "./cards/light.svelte";
    import Button from "./cards/button.svelte";

    const { item } = gridHelp;

    const cards = {
        'light': Light,
        'button': Button
    };

    const id = () => "_" + Math.random().toString(36).substr(2, 9);

    let items = [
        {
            6: gridHelp.item({
                x: 0,
                y: 0,
                w: 2,
                h: 2,
            }),
            id: id(),
            card: 'light',
            entity: 'light.theater',
            name: 'Theater',
            icon: 'ri:lightbulb-line'
        },

        {
            6: gridHelp.item({
                x: 2,
                y: 0,
                w: 2,
                h: 2,
            }),
            id: id(),
            card: 'light',
            entity: 'light.bar_bulb',
            name: 'Bar',
            icon: 'ri:lightbulb-line'
        },
    ];

    const cols = [
        [1400, 6]
    ];
</script>

<div class="demo-container" out:fade="{{ delay: 400 }}">
    <Grid bind:items rowHeight={100} let:item {cols} let:index let:dataItem>
        <div class="demo-widget content">
            <svelte:component this={cards[dataItem.card]} {dataItem} />
        </div>
    </Grid>
</div>

<style>
    .demo-widget {
        background: #f1f1f1;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .demo-container {
        max-width: 1400px;
        width: 100%;
        justify-self: center;
    }
</style>
