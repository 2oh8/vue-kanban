<template>


    <draggable :options="{draggable:'.item', group:'tasks'}">
        <div class="item card-panel zoomIn hoverable grey lighten-1">
            <button class="secondary-content btn-floating z-depth-0 transparent" @click=""><i class="material-icons red-text">delete_forever</i></button>
            <p class="card-title">{{task.name}}</p>
            <div v-for="comment in comments" class="row">

                <comment class="flipInX" :comment='comment'></comment>

            </div>
            <div class="row">
                <form @submit.prevent="addComment">
                    <input type="text" placeholder="Leave a Comment" v-model="text">
                    <button class="secondary-content btn-floating z-depth-0 transparent" type="submit"><i class="material-icons green-text">comment</i></button>
                </form>
            </div>
        </div>
        <!-- THIS IS A DUMMY PLACEHOLDER DIV TO MAINTAIN DRAGGABILITY IN EMPTY DRAG AREAS -->
        <div class="card-panel transparent z-depth-0 item"></div>
        <!-- END COMMENT -->
    </draggable>

</template>

<script>
    import draggable from 'vuedraggable';
    import Comment from './Comment'

    export default {
        name: 'tasks',
        data() {
            return {
                text: ''
            }
        },
        props: [
            "task"
        ],

        components: {
            draggable,
            Comment
        },
        mounted() {
            var customTask = this.task
            customTask.taskId = this.task._id
            this.$store.dispatch('getTaskComments', customTask)

        },
        computed: {
            comments() {
                return this.$store.state.comments[this.task._id]
                // return this.$store.state.lists // make sure this works after adding the add task functionality
            },
            user() {
                return this.$store.state.user
            }
        },
        methods: {
            addComment: function () {
                var newComment = {
                    text: this.text,
                    commenterName: this.user.name,
                    boardId: this.$route.params.boardId,
                    listId: this.task.listId,
                    taskId: this.task._id
                }

                this.$store.dispatch('addComment', newComment)
                this.text = ''
            },
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