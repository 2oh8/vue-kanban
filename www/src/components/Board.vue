<template>
  <div>

    <div class="row">
      <div class="col s12 content-row">
        <h5 class="grey-text text-darken-2">Board: {{board.name}}</h5>


        <div class="card-panel board-lifter zoomIn z-depth-5">
          <div class="flex-container">
            <div v-for="list in lists">
              <list :list="list"></list>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import List from './List'

  export default {
    name: 'board',
    data: function () {
      return {
        showListCreationForm: false,
        listTitle: '',
        listDescription: ''
      }
    },

    mounted() {
      this.$store.dispatch('getLists', this.$route.params.boardId)
      // this.$store.dispatch('getBoard',this.$route.params.boardId)

    },
    components: {
      List
    },
    computed: {
      board() {
        return this.$store.state.activeBoard
      },
      lists() {
        return this.$store.state.lists
      }
    },
    methods: {
      toggleAddList: function () {
        this.showListCreationForm = !this.showListCreationForm
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

    }

  }

</script>

<style scoped>
  .board-lifter {
    background: rgba(0, 0, 0, .5);
    height: 80vh;
    position: center center absolute;
    overflow-y: hidden;
    overflow-x: scroll;
    white-space: nowrap;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
  }

  .content-row {
    width: auto;
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
  /* coppied from list.vue */

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