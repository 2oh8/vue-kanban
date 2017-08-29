<template>
  <div>
    <div class="row tab-row">

      <div class="tab card-panel">
        <button class="btn-floating z-depth-0 transparent" @click="createBoard"><i class="material-icons add-button blue-text text-darken-1">note_add</i></button>
      </div>

    </div>
    

      <ul class="collection z-depth-5">
        <div v-for="board in boards">
          <li class="collection-item avatar panel">
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

  .tab {
    width: 10vw;
    margin-bottom: 0;
    left: 0;
    padding-bottom: 0;
  }
  .panel {
    border-bottom: 1px solid #e0e0e0 !important;
  }

  
</style>