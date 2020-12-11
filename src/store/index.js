import Vue from 'vue';
import Vuex from 'vuex';
import generateRandomString from '@/utils/randomString';
import fetch from '@/utils/fetch';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        userId: null,
        user: null,
        guilds: [],
        stateParam: null,
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
        authUser(state, { token, userId, user }) {
            state.token = token;
            state.userId = userId;
            state.user = user;
        },
        clearAuth(state) {
            state.token = null;
            state.userId = null;
            state.user = null;
        },
        setState(state, rndStr) {
            state.stateParam = rndStr;
        },
        setGuilds(state, guilds) {
            state.guilds = guilds;
        },
        clearGuilds(state) {
            state.guilds = [];
        }
    },
    actions: {
        toggleSidebar({ commit }) {
            commit('toggleSidebar')
        },
        toggleTheme({ commit }) {
            commit('toggleTheme')
        },
        login({ commit, dispatch }, { token, userId, user }) {
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('user', JSON.stringify(user));
            commit('authUser', { token, userId, user });
            dispatch('setGuilds', token);
        },
        logout({ commit }) {
            commit('clearAuth');
            commit('clearGuilds');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('user');
        },
        autoLogin({ commit, dispatch }) {
            const token = localStorage.getItem('token');
            if (!token)
                return;
            const userId = localStorage.getItem('userId');
            const user = JSON.parse(localStorage.getItem('user'));
            commit('authUser', { token, userId, user });
            dispatch('setGuilds', token);
        },
        setState({ commit }) {
            const rndStr = generateRandomString();
            localStorage.setItem('stateParam', rndStr);
            commit('setState', rndStr);
        },
        setGuilds({ commit }, token) {
            fetch("https://discord.com/api/users/@me/guilds", {
                    headers: {
                        authorization: token,
                    },
                })
                .then((res) => res.json())
                .then((response) => {
                    commit('setGuilds', response.slice(0, 13));
                })
                .catch(console.error);
        }
    }
});