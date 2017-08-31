<template>
  <div>
    <div class="row tab-row">

      <div class="col s1 add-button">
        <button class="center-align add-button btn-floating hoverable white" @click="toggleAddForm"><i class="material-icons add-button blue-text text-darken-1">note_add</i></button>
      </div>
      <div class="col s10 slideInLeft" v-if="showAddForm">

        <form @submit.prevent="createBoard">
          <div class="col s3"><input type="text" v-model="boardTitle" placeholder="Title"></div>
          <div class="col s3"><input type="text" v-model="boardDescription" placeholder="Description"></div>
          <div class="col s2"><button type="submit" class="btn blue darken-1">Create</button></div>

        </form>

      </div>


    </div>


    <ul class="collection z-depth-5">
      <div v-for="board in boards">
        <li class="collection-item hoverable flipInX avatar panel">
          <i class="material-icons circle green"><i class="material-icons">dashboard</i></i>
          <router-link :to="'/boards/'+board._id">
            <span class="title">{{board.name}}</span>
          </router-link>
          <p>{{board.description}}<br> {{board.created}}
          </p>
          <button class="secondary-content btn-floating z-depth-0 transparent" @click="removeBoard(board)"><i class="material-icons red-text">delete_forever</i></button>
        </li>
      </div>
    </ul>





  </div>
</template>

<script>
  export default {
    name: 'boards',
    data() {
      return {
        boardTitle: '',
        boardDescription: '',
        showAddForm: false
      }
    },
    mounted() {
      if (this.loggedIn) {
        this.$store.dispatch('getBoards')
      }
    },
    computed: {
      loggedIn() {
        return this.$store.state.loggedIn
      },
      boards() {
        return this.$store.state.boards
      }
    },
    methods: {
      createBoard() {
        if (this.boardTitle && this.boardDescription) {
          this.$store.dispatch('createBoard', {
            name: this.boardTitle,
            description: this.boardDescription
          })
          this.toggleAddForm();
        }
      },
      removeBoard(board) {
        this.$store.dispatch('removeBoard', board)
      },
      toggleAddForm() {
        this.showAddForm = !this.showAddForm
      }
    }
  }

</script>

<style scoped>
  .add-button {
    font-size: 2rem;
  }

  .add-button {

    text-align: center;
  }

  .collection {
    border: none !important;
  }

  .panel {
    border-bottom: 1px solid #e0e0e0 !important;
  }

  .zoomIn {
    animation: zoomIn 300ms;
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

  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale3d(.3, .3, .3);
    }

    50% {
      opacity: 1;
    }
  }

  @keyframes slideInLeft {
    from {
      transform: translate3d(-100%, 0, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }

  .slideInLeft {
    animation-name: slideInLeft;
    animation-duration: 500ms;
  }
</style>