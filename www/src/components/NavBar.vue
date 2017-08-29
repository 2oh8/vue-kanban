<template>
    <div class="NavBar">
        <nav class="glass">
            <div class="nav-wrapper">
                <a class="brand-logo left">Vue KanBan</a>
                <a v-if="loggedIn" class="brand-logo center user-id"><i class="material-icons">perm_identity</i> Welcome, {{ name }}!</a>
                <ul id="nav-mobile" class="right toolbar">
                    <li v-if="loggedIn"><router-link :to="/boards/">Boards</router-link></li>
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
            name() {
                return this.$store.state.name
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
</style>