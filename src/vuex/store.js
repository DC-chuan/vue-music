import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {
    
}

const mutations = {
    savePath(state,value){
        sessionStorage.setItem('path',value)
    }
}

const state = {
    path: sessionStorage.getItem('path') || ''
}

export default new Vuex.Store({
    actions,
    mutations,
    state
})