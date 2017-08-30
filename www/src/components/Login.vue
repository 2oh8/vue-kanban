<template>
    <div class="Login">
        <div class="row">
            <div class="col s6 offset-s3">
                <div class="glass zoomIn login-card card-panel z-depth-5">
                    <!-- THIS SHOWS IF SHOWREGISTER IS FALSE -->
                    <form @submit.prevent="login" v-if="!showRegister">
                        <h3>Log In:</h3>
                        <input type="text" placeholder="email" v-model="email" required="true">
                        <input type="password" placeholder="password" v-model="password" required="true">
                        <button type="submit" class="btn">Log In</button>
                        <button type="button" class="btn" @click="toggleRegister">Register</button>
                    </form>
                    <!-- THIS SHOWS IF SHOWREGISTER IS TRUE -->
                    <form @submit.prevent="registerUser" v-else-if="!loggedIn && !registered">
                        <h3>Register:</h3>
                        <input type="text" placeholder="name" required="true" v-model="name">
                        <input type="text" placeholder="email" required="true" v-model="email">
                        <input type="password" placeholder="password" required="true" v-model="password">
                        <button type="submit" class="btn">Register</button>
                        <button type="button" class="btn" @click="toggleRegister">Back to Log-In</button>
                    </form>
                    <!-- SUCCESSFUL REGISTRATION POP-UP -->
                    <div class="row" v-if="registered && showRegister">
                        <div class="col s12 white-text">
                            <div class="card-panel green accent-4 z-depth-5">
                                <p><i class="material-icons">check_circle</i> New user registered successfully! <button type="button"
                                        class="btn" @click="toggleRegister">Log In</button></p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data: function () {
            return {
                showRegister: false,
                name: '',
                email: '',
                password: '',
            }
        },
        computed: {
            registered() {
                return this.$store.state.registered
            },
            loggedIn() {
                return this.$store.state.loggedIn
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
            login: function () {
                var credentials = {
                    email: this.email,
                    password: this.password
                }
                this.$store.dispatch("login", credentials)
            }
        },
    }

</script>

<style scoped>
    .glass {
        background: rgba(0, 0, 0, .8);
        color: white;
    }

    .login-card {
        margin-top: 8rem;
        
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
  animation: flipInX 500s;
}
</style>