import Vue from 'vue';
import Vuex from 'vuex';
//import Request from './HttpRequestFactory';
//import router from '../router/index';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        userId: null,
        userDataUuid: null,
        user: null,
        sideBarOpen: false
    },
    getters: {
        sideBarOpen: state => {
            return state.sideBarOpen
        },
        user(state) {
            return state.user;
        },
        ifAuthenticated(state) {
            return state.token !== undefined && state.token !== null;
        }
    },
    mutations: {
        toggleSidebar(state) {
            state.sideBarOpen = !state.sideBarOpen
        },
        authUser(state, userData) {
            state.token = userData.token;
            state.userId = userData.userId;
            state.userDataUuid = userData.userDataUuid;
            state.user = userData.user;
        },
        clearAuth(state) {
            state.token = null;
            state.userId = null;
            state.userDataUuid = null;
            state.user = null;
        }
    },
    actions: {
        toggleSidebar(context) {
            context.commit('toggleSidebar')
        }
    }
});