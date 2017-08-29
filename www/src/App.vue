<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view v-if="loggedIn"></router-view>
    <Login v-else-if="loggedIn==false"></Login>
  </div>
</template>

<script>
import Error from './components/Error'
import Login from './components/Login'
import NavBar from './components/NavBar'

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
    Login,
    NavBar
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
