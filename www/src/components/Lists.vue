<template>
    <div class="flex-container">

        <div class="list flipInY card-panel grey lighten-3 z-depth-5">
            <h5>Title</h5>
            <p>Description</p>
            
        </div>

        <!-- FORM FOR ADDING NEW LIST -->
        <div v-if="showListForm"class="list flipInY card-panel grey lighten-3 z-depth-5 grey-text">
                <a @click="toggleAddList"><i class="hoverable material-icons grey-text">close</i></a>
            <form @submit.prevent="">
                <div class="row">
                    <input type="text" v-model="listTitle" required="true">
                </div>
                <div class="row">
                    <input type="text" v-model="listDescription" required="true">
                </div>
                <div class="row">
                    <button class="btn blue darken-1" type="submit">Add List</button>
                </div>
            </form>
        </div>

        <!-- BUTTON TO ADD A NEW LIST -->
        <a v-else @click="toggleAddList"><div class="list flipInY card-panel grey lighten-3 z-depth-5 add-card grey-text"><i style="font-size: 30vw; text-align: center"class="material-icons">add</i></div></a>
    </div>
</template>

<script>
    export default {
        name: 'lists',
        data: function () {
            return {
                showListForm: false,
                listTitle: '',
                listDescription: ''
            }
        },
        mounted() {

        },
        computed: {

        },
        methods: {
            toggleAddList: function () {
                this.showListForm = !this.showListForm
            },
        }
    }
</script>

<style scoped>
    .list {
        width: 30vw;
        height: 50vh;
        margin-right: 2vw;    
    }
    .flex-container {
        display: flex;
        width: 10000vw;
    }
    .add-card{
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: .5;
    }
    .add-card:hover {
    transition-duration: 3000ms;
    opacity: 1;
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