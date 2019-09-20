import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './firebase'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  logfiles: [],
  logfile: null
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  setLogfile(state, logfile) {
    state.logfile = logfile
  },
  setLogfiles(state, logfiles) {
    state.logfiles = logfiles
  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  fetchLogfiles({ commit }) {
    return new Promise((resolve, reject) => {
      firebase.getLogfiles().then(logfiles => {
        commit('setLogfiles', logfiles)
        resolve()
      })
    })
  },
  fetchLogfile({ commit }, id) {
    return new Promise((resolve, reject) => {
      firebase.getLogfile(id).then(logfile => {
        commit('setLogfile', logfile)
        console.log(logfile)
        resolve()
      })
    })
  }
}

// getters are functions
const getters = {
  evenOrOdd: state => (state.count % 2 === 0 ? 'even' : 'odd')
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
