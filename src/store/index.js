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
        currentGuild: null,
        currentGuildId: null,
        coins: [],
        defaultCoin: null,
        currentCoin: 0,
        stateParam: null,
        sideBarOpen: false,
        dark: true,
    },
    getters: {
        sideBarOpen(state) {
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
            localStorage.setItem('preferedTheme', state.dark ? 'dark' : 'light');
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
        setCurrentGuild(state, { guildIdx, guildId }) {
            state.currentGuild = guildIdx;
            state.currentGuildId = guildId;
        },
        clearGuilds(state) {
            state.guilds = [];
            state.currentGuild = null;
            state.currentGuildId = null;
        },
        setCoins(state, coins) {
            state.coins = coins;
        },
        setCurrentCoin(state, coinId) {
            state.currentCoin = coinId;
        },
        setDefaultCoin(state, coin) {
            state.defaultCoin = coin;
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
                    if (response.code === 0) {
                        const loginUrl = 'https://discord.com/api/oauth2/authorize?client_id=786246670530773023&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fdashboard%2Fhome&response_type=token&scope=identify%20guilds' +
                            `&state=${this.stateParam}`;
                        window.location.replace(loginUrl);
                        return;
                    }
                    commit('setGuilds', response.slice(0, 13));
                })
                .catch(console.error);
        },
        setCoins({ commit }) {
            fetch("https://api.rally.io/v1/creator_coins")
                .then((res) => res.json())
                .then((response) => {
                    commit('setCoins', response);
                })
                .catch(console.error);
        },
        setDefaultCoin({ commit }, coin) {
            localStorage.setItem('defaultCoin', JSON.stringify(coin));
            commit('setDefaultCoin', coin);
        },
        getDefaultCoin({ commit }) {
            const coin = localStorage.getItem('defaultCoin');
            if (!coin)
                return;
            commit('setDefaultCoin', JSON.parse(coin));
        },
        setPreferedTheme() {
            const theme = localStorage.getItem('preferedTheme');
            if (!theme)
                return;
            this.state.dark = theme === 'dark';
        },
    }
});