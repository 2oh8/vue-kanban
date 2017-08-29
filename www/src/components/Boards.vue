<template>
  <div>
    <button class="btn blue darken-1" @click="createBoard"><i class="material-icons add-button">note_add</i></button>
    <ul>
      <li v-for="board in boards">
        <router-link :to="'/boards/'+board._id">{{board.name}}</router-link> <span @click="removeBoard(board)">x</span></li>
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
.add-button{
  font-size: 2rem;
}
</style>