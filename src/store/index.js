import Vue from 'vue';
import Vuex from 'vuex';
//import Request from './HttpRequestFactory';
//import router from '../router/index';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        userId: null,
        username: null,
        user: null,
        sideBarOpen: false,
        dark: true
    },
    getters: {
        sideBarOpe(state) {
            return state.sideBarOpen;
        },
        dark(state) {
            return state.dark;
        },
        user(state) {
            return state.user;
        },
        ifAuthenticated(state) {
            return !!state.token;
        }
    },
    mutations: {
        toggleSidebar(state) {
            state.sideBarOpen = !state.sideBarOpen;
        },
        toggleTheme(state) {
            state.dark = !state.dark;
        },
        authUser(state, { token, userId, user, username }) {
            state.token = token;
            state.userId = userId;
            state.username = username;
            state.user = user;
        },
        clearAuth(state) {
            state.token = null;
            state.userId = null;
            state.username = null;
            state.user = null;
        }
    },
    actions: {
        toggleSidebar({ commit }) {
            commit('toggleSidebar')
        },
        toggleTheme({ commit }) {
            commit('toggleTheme')
        },
        login({ commit }, { token, userId, user, username }) {
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('username', username);
            localStorage.setItem('user', JSON.stringify(user));
            commit('authUser', { token, userId, user });
        },
        logout({ commit }) {
            commit('clearAuth');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
            localStorage.removeItem('user');
        },
        autoLogin({ commit }) {
            const token = localStorage.getItem('token');
            if (!token)
                return;
            const userId = localStorage.getItem('userId');
            const username = localStorage.getItem('username');
            const user = JSON.parse(localStorage.getItem('user'));
            commit('authUser', { token, userId, user, username });
        }
    }
});