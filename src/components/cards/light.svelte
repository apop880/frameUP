<script>
    import { stateStore, action } from '../../apistore.js';

    export let dataItem;

    let entityObj;

    $: {
        entityObj = Object.values($stateStore).filter(value => (value.entity_id === dataItem.entity))[0];
    }
</script>

<button class:on={entityObj.state === "on"} class:off={entityObj.state === "off"} on:click="{() => action('light.toggle', dataItem.entity)}">
        <div class="icon">
            <span class="iconify" data-icon={dataItem.icon}></span>
        </div>
        <div class="name">{dataItem.name}</div>    
</button>

<style>
    button {
        width: 100%;
        height: 100%;
        background-color: rgba(46, 45, 45, 0.825);
        color:white;
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

    .on {
        box-shadow: 0px 0px 15px 5px rgb(202 199 18 / 85%);
        transition: 0.5s;
    }

    .off {
        transition: 0.5s;
    }

    .icon {
        grid-area: icon;
    }

    .name {
        grid-area: name;
    }

    .state {
        grid-area: state;
    }
</style>