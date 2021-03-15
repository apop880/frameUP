<div class="modal">
    <div class="modal-content">
        Connecting to Home Assistant... <br />
        <div id="bar" class="indeterminate-progress-bar active">
            <div class="progress-block single-segment" />
        </div>
    </div>
</div>

<style>
    .modal {
        position: fixed; /* Stay in place */
        z-index: 15; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.7); /* Black w/ opacity */
        text-align: center;
        font-size: 20pt;
    }

    .modal-content {
        background-color: rgb(175, 175, 175);
        margin: 15% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
        width: 80%; /* Could be more or less, depending on screen size */
        line-height: 30px;
        border-radius: 20px;
    }

    .indeterminate-progress-bar,
    .indeterminate-progress-bar > .progress-block {
        border-style: solid;
        border-width: 1px;
        border-color: rgba(0, 0, 0, 0.25);

        border-radius: 5px;
    }

    .indeterminate-progress-bar {
        height: 25px;

        margin: 0.5em;

        background-color: rgb(214, 214, 214);

        -webkit-box-shadow: 0px 0px 10px 0px rgba(50, 50, 50, 0.75);
        -moz-box-shadow: 0px 0px 10px 0px rgba(50, 50, 50, 0.75);
        box-shadow: 0px 0px 10px 0px rgba(50, 50, 50, 0.75);

        overflow: hidden;
    }

    .indeterminate-progress-bar > .progress-block {
        -webkit-animation-name: none;
        -webkit-animation-duration: 2.5s;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-delay: 0s;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-direction: alternate;
        -webkit-animation-play-state: paused;

        animation-name: none;
        animation-duration: 2.5s;
        animation-timing-function: ease-in-out;
        animation-delay: 0s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-play-state: paused;
    }

    .indeterminate-progress-bar.active > .progress-block {
        -webkit-animation-name: bar-movement;
        -webkit-animation-play-state: running;

        animation-name: bar-movement;
        animation-play-state: running;
    }

    @-webkit-keyframes bar-movement {
        from {
            left: -100px;
        }
        to {
            left: calc(75% + 100px);
        }
    }

    @keyframes bar-movement {
        from {
            left: -100px;
        }
        to {
            left: calc(75% + 100px);
        }
    }

    .progress-block {
        position: relative;

        top: -1px;
        left: -1px;

        width: 25%;
        height: 100%;

        background: rgb(54, 23, 168);
    }
</style>
