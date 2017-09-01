<template>
    <div class="flex-container">
        <div class="card comment-card grey lighten-2">
            <!-- edit comment form that shows when editCommentForm is true -->
            <div v-if="editCommentForm && isCreator">
                <form @submit.prevent="editComment">
                    <input class="flipInX" type="text" v-model="updatedText">
                    <button class="flipInX secondary-content btn-floating z-depth-0 transparent" type="submit"><i class="material-icons green-text">done</i></button>
                    <button class="flipInX secondary-content btn-floating z-depth-0 transparent" @click="toggleEditComment" type="button"><i class="material-icons red-text">close</i></button>
                </form>
            </div>
            <!-- what shows if the editCommentForm is false but the user is the creator-->
            <div v-else-if="isCreator">
                <p class="comment-chip">{{comment.text}}</p>
                <button class="secondary-content btn-floating z-depth-0 transparent flipInX" @click="deleteComment"><i class="material-icons grey-text">delete_forever</i></button>
                <button class="secondary-content btn-floating z-depth-0 transparent flipInX" @click="toggleEditComment"><i class="material-icons grey-text">edit</i></button>
            </div>
            <div v-else>
                <p class="comment-chip">{{comment.text}}</p>
            </div>

            <div class="chip comment-chip grey lighten-1">
                {{comment.commenterName}}
                <!-- Need to add in path to post username to the comment -->
            </div>

        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable';

    export default {
        name: 'comments',
        data: function () {
            return {
                editCommentForm: false,
                updatedText: this.comment.text,
                isCreator: false
            }
        },
        components: {
        },
        props: [
            'comment'
        ],
        mounted() {
            this.setCreatorStatus()
        },
        computed: {
            lists() {
                return this.$store.state.lists
                // still need to add v-for in HTML
            },
            activeBoard() {
                return this.$store.state.activeBoard
            },
            user() {
                return this.$store.state.user
            }
        },
        methods: {
            setCreatorStatus() {
                if (this.comment.creatorId == this.user._id) {
                    this.isCreator = true
                }
            },
            toggleEditComment() {
                this.editCommentForm = !this.editCommentForm
            },
            deleteComment() {
                this.$store.dispatch('authenticate')
                    .then(res => {
                        if (this.comment.creatorId == this.user._id) {
                            this.$store.dispatch("deleteComment", this.comment)
                        }
                        else {
                            console.log('you are not authorized to delete this comment')
                        }
                    }).catch(err => {
                        console.log('something went wrong with the authenticate request')
                    })

            },
            editComment() {
                this.$store.dispatch('authenticate')
                    .then(res => {
                        if (this.comment.creatorId == this.user._id) {
                            console.log(this.comment)
                            var newCommentObject = {
                                text: this.updatedText,
                                boardId: this.comment.boardId,
                                listId: this.comment.listId,
                                taskId: this.comment.taskId,
                                id: this.comment._id
                            }
                            this.$store.dispatch('editComment', newCommentObject)
                        }
                        else {
                            console.log('you are not authorized to edit this comment')
                        }
                    })
                this.toggleEditComment()
            }
        }
    }

</script>

<style scoped>
    .comment-chip {
        margin-top: .5vh;
        margin-left: .5vw;
    }

    .comment-card {
        width: 100%
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