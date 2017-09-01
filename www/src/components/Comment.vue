<template>
    <div class="flex-container">
        <div class="card comment-card grey lighten-2">
            <p class="comment-chip">{{comment.text}}</p>
            <button class="secondary-content btn-floating z-depth-0 transparent" @click="deleteComment"><i class="material-icons grey-text">delete_forever</i></button>
            <div class="chip comment-chip grey lighten-1">
                {{comment.commenterName}}  <!-- Need to add in path to post username to the comment -->
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
            }
        },
        components: {
        },
        props: [
            'comment'
        ],
        mounted() {

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
            deleteComment(){
                this.$store.dispatch("deleteComment", this.comment)
            }
        }
    }
</script>

<style scoped>
    .comment-chip{
        margin-top: .5vh;
        margin-left: .5vw;
    }
    .comment-card{
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