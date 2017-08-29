<template>
  <div id="app">
    <router-view v-if="loggedIn"></router-view>
    <Login v-else></Login>
  </div>
</template>

<script>
import Error from './components/Error'
import Login from './components/Login'

export default {
  name: 'app',
  mounted() {
    this.$store.dispatch('authenticate')
  },
  data() {
    return {}
  },
  components:{
    Error,
    Login
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn
    }
  }
}
</script>

<style>
#app {
  background: url("http://i.imgur.com/hQcZDWY.jpg") center center fixed;
  height: 100%;
  padding-bottom: 100rem;
  background-repeat: no-repeat;
}
</style>
