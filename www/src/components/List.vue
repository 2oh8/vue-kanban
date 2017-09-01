<template>
    <div class="flex-container">

        <div id="" class="list flipInY card-panel grey lighten-3 z-depth-5 list-card">
            <div>
                <button class="secondary-content btn-floating z-depth-0 transparent" @click="deleteList(list._id)"><i class="material-icons red-text">delete_forever</i></button>
                <h5>{{list.name}}</h5>
                <p style="border-bottom: 1px solid black">{{list.description}}</p>
            </div>

            <!-- TASKS GO HERE -->
            <div class="task-container dragArea">
                <div v-if="showAddTaskForm" class="item card flipInX grey lighten-1">
                    <form @submit.prevent="addTask">
                        <button @click="toggleTaskForm" class="secondary-content btn-floating z-depth-0 transparent" type="submit"><i class="material-icons grey-text text-darken-1">close</i></button>
                        <button class="secondary-content btn-floating z-depth-0 transparent" type="submit"><i class="material-icons grey-text text-darken-1">playlist_add</i></button>
                        <input type="text" placeholder="Task Name" v-model="taskTitle">
                        <div class="row">
                            <input type="text" placeholder="Description" v-model="taskDescription">
                        </div>
                    </form>
                </div>
                <div class="delete-list-button">
                    <button type="button" class="btn blue darken-1" @click="toggleTaskForm">Add Task</button>
                </div>

                <div v-for="task in tasks">
                    <task :task="task"></task>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Task from './Task'
    import draggable from 'vuedraggable';

    export default {
        name: 'list',
        data() {
            return {
                showAddTaskForm: false,
                taskTitle: '',
                taskDescription: ''
            }
        },

        props: [
            "list"
        ],
        components: {
            Task,
            draggable
        },
        mounted() {
            var customList = this.list
            customList.listId = this.list._id
            this.$store.dispatch('getListTasks', customList)
            // debugger
            console.log(this.$store.state.tasks[this.list._id])
            // this.$store.dispatch('getLists', this.$route.params.boardId)
        },
        computed: {
            lists() {
                return this.$store.state.lists
                // still need to add v-for in HTML
            },
            activeBoard() {
                return this.$store.state.activeBoard
            },
            tasks() {
                 console.log(this.list._id)
                return this.$store.state.tasks[this.list._id]
            }
        },
        methods: {
            toggleTaskForm: function () {
                console.log(this.showAddTaskForm)
                this.showAddTaskForm = !this.showAddTaskForm
            },

            addTask: function () {
                console.log('inside of addTask!')
                console.log(this.list._id)
                var newTask = {
                    name: this.taskTitle,
                    description: this.taskDescription,
                    boardId: this.$route.params.boardId,
                    listId: this.list._id,
                }
                console.log(newTask)
                debugger
                this.$store.dispatch('addTask', newTask)
            },
            deleteList: function (listId) {
                console.log(listId)
                this.$store.dispatch('deleteList', listId)
            },

        }
    }

</script>

<style scoped>
    .list {
        width: 25rem;
        height: 70vh;
        margin-right: 2vw;
    }

    .flex-container {
        display: flex;
        width: auto;
    }

    .list-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .add-card {
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: .5;
    }

    .add-card:hover {
        transition-duration: 3000ms;
        opacity: 1;
    }

    .delete-list-button {
        align-self: flex-end;
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

    @keyframes flipInX {
        from {
            transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
            animation-timing-function: ease-in;
            opacity: 0;
        }

        40% {
            transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
            animation-timing-function: ease-in;
        }

        60% {
            transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
            opacity: 1;
        }

        80% {
            transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
        }

        to {
            transform: perspective(400px);
        }
    }

    .flipInX {
        -webkit-backface-visibility: visible !important;
        backface-visibility: visible !important;
        animation-name: flipInX;
        animation-duration: 1000ms;
    }
    /* Coppied from tasks */

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