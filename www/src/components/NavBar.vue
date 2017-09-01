<template>
    <div class="NavBar flipInX">
        <nav class="glass">
            <div class="nav-wrapper ">
                <a class="brand-logo left">Vue KanBan</a>
                <span v-show="loggedIn" class="brand-logo center user-id"><i class="material-icons">perm_identity</i> Welcome, {{ user.name }}!</span>
                <ul id="" class="right toolbar">
                    <li v-if="loggedIn"><router-link :to="{name: 'Boards'}" class="">Boards</router-link></li>
                    <li v-if="loggedIn"><button type="button" class="btn blue darken-1" @click="logout">Log Out</button></li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'navbar',
        data: function () {
            return {
                showRegister: false,
            }
        },
        computed: {
            registered() {
                return this.$store.state.registered
            },
            loggedIn() {
                return this.$store.state.loggedIn
            },
            user() {
                return this.$store.state.user
            }
            // error(){
            //   return this.$store.state.error
        },
        methods: {
            toggleRegister: function () {
                this.showRegister = !this.showRegister
            },
            registerUser: function () {
                var newUser = {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }
                this.$store.dispatch("registerUser", newUser)
            },
            logout: function () {
                this.$store.dispatch("logout")
            }
        },
    }

</script>

<style scoped>
    .glass {
        background-color: rgba(0, 0, 0, .8);
        color: white;
    }
    .brand-logo{
        margin-left: 2vw;
    }
    .toolbar{
        margin-right: 2vw;
    }
    .user-id {
        font-size: 1rem;
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