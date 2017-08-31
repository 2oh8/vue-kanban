<template>
  <div> 
    
    <div class="row">
      <div class="col s12 content-row">
          <h5 class="grey-text text-darken-2">Board: {{board.name}}</h5>
        <div class="card-panel board-lifter zoomIn z-depth-5">

          <lists></lists>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lists from './Lists'

export default {
  name: 'board',
  mounted(){
    this.$store.dispatch('getBoard',this.$route.params.boardId)
  },
  components: {
    Lists
  },
  computed:{
    board(){
      return this.$store.state.activeBoard
    }
  }
}
</script>

<style scoped>
  .board-lifter{
    background: rgba(0, 0, 0, .5);
    height: 80vh;
    position: center center absolute;
    overflow-y: hidden;
    overflow-x: scroll;
    white-space: nowrap;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
  }
  .content-row{
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
</style>
