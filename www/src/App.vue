<template>
  <div id="app">
    <Login></Login>
    <router-view></router-view>
  </div>
</template>

<script>
import Error from './components/Error'
import Login from './components/Login'

export default {
  name: 'app',
  components:{
    Error,
    Login
  }
}
</script>

<style>
#app {
  background: url("http://i.imgur.com/hQcZDWY.jpg") center center fixed;
  height: 100%;
  padding-bottom: 100rem;
}
</style>
