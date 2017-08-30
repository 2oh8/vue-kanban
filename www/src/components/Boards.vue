<template>
  <div>
    <div class="row tab-row">

      <div class="col s1 add-button">
        <button class="center-align add-button btn-floating hoverable white" @click="createBoard"><i class="material-icons add-button blue-text text-darken-1">note_add</i></button>
      </div>

    </div>
    

      <ul class="collection z-depth-5">
        <div v-for="board in boards">
          <li class="collection-item hoverable zoomIn avatar panel">
            <i class="material-icons circle green"><i class="material-icons">dashboard</i></i>
            <router-link :to="'/boards/'+board._id">
              <span class="title">{{board.name}}</span>
            </router-link>
            <p>Date Created <br> Whatever
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
        this.$store.dispatch('createBoard', {
          name: 'Testing board creation',
          description: 'blarg'
        })
      },
      removeBoard(board) {
        this.$store.dispatch('removeBoard', board)
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

  .collection{
    border: none !important;
  }
  .panel {
    border-bottom: 1px solid #e0e0e0 !important;
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

  
</style>