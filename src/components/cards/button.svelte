<script>
    import { action } from '../../store.js';

    export let dataItem;
</script>

<button on:click="{() => action('light.toggle', dataItem.entity)}">
        <div class="icon"><span class="iconify" data-icon={dataItem.icon}></span></div>
        <div class="name">{dataItem.name}</div>    
</button>

<style>
    button {
        width: 100%;
        height: 100%;
        background-color: rgba(216, 212, 212, 0.904);
        color:rgb(51, 51, 51);
        border: 1 px grey solid;
        border-radius: 20px;
        padding: 10px;
        margin-top: 10px;
        display: grid;
        grid-template-columns: 80px 1fr;
        grid-template-areas:
            "icon name";
        align-self: center;
        align-items: center;
    }

    .icon {
        grid-area: icon;
    }

    .name {
        grid-area: name;
    }
</style>