<template>
    <div class="flex-container">
        <!-- v-for goes in here -->
        <div v-for="list in lists">

            <div class="list flipInY card-panel grey lighten-3 z-depth-5 list-card">
                <div>
                    <button class="secondary-content btn-floating z-depth-0 transparent" @click="deleteList(list._id)"><i class="material-icons red-text">delete_forever</i></button>
                    <h5>{{list.name}}</h5>
                    <p style="border-bottom: 1px solid black">{{list.description}}</p>
                    <div v-if="showAddTaskForm" class="item card flipInX grey lighten-1">
                        <form @submit.prevent="">
                            <button @click="toggleTaskForm" class="secondary-content btn-floating z-depth-0 transparent" type="submit"><i class="material-icons grey-text text-darken-1">close</i></button>
                            <button class="secondary-content btn-floating z-depth-0 transparent" type="submit"><i class="material-icons grey-text text-darken-1">playlist_add</i></button>
                            <input type="text" placeholder="Task Name">
                        </form>
                    </div>
                </div>

                <!-- TASKS GO HERE -->

                <tasks></tasks>

                <!-- TASKS GO HERE -->


                <div class="delete-list-button">
                    <button type="button" class="btn blue darken-1" @click="toggleTaskForm">Add Task</button>
                </div>
            </div>
        </div>

        <!-- FORM FOR ADDING NEW LIST -->
        <div v-if="showListCreationForm" class="list flipInY card-panel grey lighten-3 z-depth-5 grey-text">
            <a @click="toggleAddList"><i class="material-icons grey-text">close</i></a>
            <form @submit.prevent="addList">
                <div class="row">
                    <input type="text" v-model="listTitle" required="true" placeholder="List Title">
                </div>
                <div class="row">
                    <input type="text" v-model="listDescription" required="true" placeholder="Description">
                </div>
                <div class="row">
                    <button class="btn blue darken-1" type="submit">Add List</button>
                </div>
            </form>
        </div>

        <!-- BUTTON TO ADD A NEW LIST -->
        <a v-else @click="toggleAddList">
            <div class="list flipInY card-panel grey lighten-3 z-depth-5 add-card grey-text"><i style="font-size: 30vw; text-align: center" class="material-icons">add</i></div>
        </a>
    </div>
</template>

<script>
    import Tasks from './Tasks'
    import draggable from 'vuedraggable';

    export default {
        name: 'lists',
        data: function () {
            return {
                showListCreationForm: false,
                showAddTaskForm: false,
                listTitle: '',
                listDescription: ''
            }
        },
        components: {
            Tasks,
        },
        mounted() {
            this.$store.dispatch('getLists', this.$route.params.boardId)
        },
        computed: {
            lists() {
                return this.$store.state.lists
                // still need to add v-for in HTML
            },
            activeBoard() {
                return this.$store.state.activeBoard
            }
        },
        methods: {
            toggleAddList: function () {
                this.showListCreationForm = !this.showListCreationForm
            },
            toggleTaskForm: function () {
                this.showAddTaskForm = !this.showAddTaskForm
            },
            addList: function () {
                // console.log(this.activeBoard._id)
                var newList = {
                    name: this.listTitle,
                    description: this.listDescription,
                    boardId: this.$route.params.boardId
                }
                this.$store.dispatch("addList", newList)
                this.listTitle = ''
                this.listDescription = ''
                this.toggleAddList()
            },
            deleteList: function (listId) {
                console.log(listId)
                this.$store.dispatch('deleteList', listId)
            }
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
</style>