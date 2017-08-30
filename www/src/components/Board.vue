<template>
  <div> 
    
    <div class="row">
      <div class="col s12">
          <h5 class="grey-text text-darken-2">Active Board: {{board}}</h5>
        <div class="card-panel board-lifter zoomIn z-depth-5">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'board',
  mounted(){
    this.$root.$store.dispatch('getBoard',this.$route.params.id)
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
    height: 85vh
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
