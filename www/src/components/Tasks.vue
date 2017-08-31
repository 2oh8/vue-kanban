<template class="dragArea">
    <div class="task-container dragArea">
        <draggable v-model="exampleList" :options="{draggable:'.item', group:'tasks'}">
            <div class="item card-panel zoomIn hoverable grey lighten-1" v-for="text in exampleList" :key="text">
                <button class="secondary-content btn-floating z-depth-0 transparent" @click=""><i class="material-icons red-text">delete_forever</i></button>
                <p class="card-title">{{text}}</p>
                <div class="row">

                    <comments></comments>

                </div>
                <div class="row">
                    <form @submit.prevent="">
                        <input type="text" placeholder="Leave a Comment">
                        <button class="secondary-content btn-floating z-depth-0 transparent" type="submit"><i class="material-icons green-text">comment</i></button>
                    </form>
                </div>
            </div>
            <div class="item card-panel transparent z-depth-0">
            </div>
        </draggable>
    </div>

</template>

<script>
    import draggable from 'vuedraggable';
    import Comments from './Comments'

    export default {
        name: 'tasks',
        data: function () {
            return {
                taskTitle: '',
                taskDescription: ''
            },
                ({
                    exampleList: [
                        'Do the Dishes',
                        'Take out Trash',
                        'Mow Lawn',
                        'Water Plants',
                        'Make Dinner'
                    ]
                })
        },
        components: {
            draggable,
            Comments
        },
        mounted() {

        },
        computed: {

        },
        methods: {
            toggleTaskForm: function () {
                this.showAddTaskForm = !this.showAddTaskForm
            },
            add: function () {
                this.exampleList.push({
                });
            },
            replace: function () {
                this.exampleList = []
            }
        }
    }

</script>

<style scoped>
    .task-container {
        overflow-x: hidden;
        overflow-y: scroll;
        width: 100%;
        height: 100%;
    }

    .card-title {
        padding-bottom: 1vh;
        border-bottom: 1px solid black;
    }

    .add-button {
        margin-top: 1vh;
        margin-bottom: 1vh;
    }

    .add-card {
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: .5;
    }

    .task-container::-webkit-scrollbar {
        display: none;
    }

    .task-chip {
        margin: 1rem;
    }


    .zoomIn {
        animation: zoomIn 300ms;
    }

    @keyframes zoomIn {
        from {
            opacity: 0;
            transform: scale3d(.3, .3, .3);
        }

        50% {
            opacity: 1;
        }
    }

    @keyframes flipInY {
        from {
            transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
            animation-timing-function: ease-in;
            opacity: 0;
        }

        40% {
            transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
            animation-timing-function: ease-in;
        }

        60% {
            transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
            opacity: 1;
        }

        80% {
            transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
        }

        to {
            transform: perspective(400px);
        }
    }

    .flipInY {
        -webkit-backface-visibility: visible !important;
        backface-visibility: visible !important;
        animation-name: flipInY;
        animation-duration: 500ms;
    }
</style>