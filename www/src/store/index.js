import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'

let api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 2000,
  withCredentials: true
})

let auth = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 2000,
  withCredentials: true
})
vue.use(vuex)

var store = new vuex.Store({
  state: {
    name: '',
    boards: [{name: 'This is total rubbish'}],
    activeBoard: {},
    error: {},
    registered: false,
    loggedIn: null
  },
  mutations: {
    setBoards(state, data){
      state.boards = data
    },
    setRegistered(state, data){
      state.registered = true
    },
    setLoggedIn(state, value) {
      state.loggedIn = value;
    },
    setName(state, name){
      state.name = name;
    },
    handleError(state, err){
      state.error = err
    }
  },
  actions: {
    //when writing your auth routes (login, logout, register) be sure to use auth instead of api for the posts

    registerUser({commit, dispatch}, newUser) {
      auth.post('/register', newUser)
        .then(res => {
          commit('setRegistered')
        })
        .catch(err=>{
          commit('handleError', err)
        })
    },

    login({commit, dispatch}, credentials){
      auth.post('/login', credentials)
        .then(res => {
          commit('setLoggedIn', true)
        }).catch(err => {
          commit('handleError', err)
        })
    },

    logout({commit, dispatch}, credentials){
      auth.delete('/logout')
        .then(res => {
          console.log(res.message)
          commit('setLoggedIn', false)
        }).catch(err => {
          commit('handleError', err)
        })
    },

    authenticate({commit, dispatch}) {
      auth('/authenticate')
        .then(res =>{
          console.log(res)
          if (res.data.data._id){
            console.log('Ready to commit!')
            commit('setLoggedIn', true)
            commit('setName', res.data.data.name)
          }else{
            commit('setLoggedIn', false)
            console.log('No session found!')
          }
        }).catch(err => {
          commit('handleError', err)
          commit('setLoggedIn', false)
        })
    },

    getBoards({commit, dispatch}) {
      api('boards')
        .then(res => {
          commit('setBoards', res.data.data)
        })
        .catch(err=>{
          commit('handleError', err)
        })
    },
    getBoard({commit, dispatch},id) {
      api('boards/' + id)
        .then(res => {
          commit('setActiveBoard', res.data.data)
        })
        .catch(err=>{
          commit('handleError', err)
        })
    },
    createBoard({commit, dispatch}, board) {
      debugger
      api.post('boards/',board)
        .then(res => {
          dispatch('getBoards')
        })
        .catch(err=>{
          commit('handleError', err)
        })
    },
    removeBoard({commit, dispatch}, board) {
      api.delete('boards/'+board._id)
        .then(res => {
          this.getBoards()
        })
        .catch(err=>{
          commit('handleError', err)
        })
    },
    handleError({commit, dispatch}, err){
      commit('handleError', err)
    }
  }

})


export default store
