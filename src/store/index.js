import Vue from 'vue';
import Vuex from 'vuex';
import generateRandomString from '@/utils/randomString';
import fetch from '@/utils/fetch';
import queryString from '@/utils/queryString';
import config from '@/config';

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
        currency: 'usd',
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
        },
        setCurrency(state, currency) {
            state.currency = currency;
        }
    },
    actions: {
        toggleSidebar({ commit }) {
            commit('toggleSidebar')
        },
        toggleTheme({ commit }) {
            commit('toggleTheme')
        },
        login({ commit }, { token, userId, user }) {
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('user', JSON.stringify(user));
            commit('authUser', { token, userId, user });
        },
        logout({ commit }) {
            commit('clearAuth');
            commit('clearGuilds');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('user');
        },
        autoLogin({ commit }) {
            const token = localStorage.getItem('token');
            if (!token)
                return;
            const userId = localStorage.getItem('userId');
            const user = JSON.parse(localStorage.getItem('user'));
            commit('authUser', { token, userId, user });
        },
        setState({ commit }) {
            const rndStr = generateRandomString();
            localStorage.setItem('stateParam', rndStr);
            commit('setState', rndStr);
        },
        setGuilds({ commit, state }, token) {
            fetch(`${config.discordApi}/users/@me/guilds`, {
                    headers: {
                        authorization: token,
                    },
                })
                .then((res) => res.json())
                .then((response) => {
                    if (response.code === 0) {
                        const loginParams = {
                            client_id: config.clientId,
                            redirect_uri: `${config.home}dashboard/home`,
                            response_type: "token",
                            scope: "identify guilds",
                            state: btoa(state.stateParam),
                        };
                        window.location.replace(`${config.discordApi}/oauth2/authorize${queryString(loginParams)}`);
                        return;
                    }
                    //check if owner or admin
                    commit('setGuilds', response.filter(guild => guild.owner || (guild.permissions & 0x8) === 0x8));
                })
                .catch(() => console.log("Failed to get guilds list."));
        },
        setCoins({ commit }) {
            fetch(`${config.rallyApi}/creator_coins`)
                .then((res) => res.json())
                .then((response) => {
                    commit('setCoins', response);
                })
                .catch(() => console.log("Failed to get coins"));
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
        setCurrency({ commit }, currency) {
            localStorage.setItem('currency', currency);
            commit('setCurrency', currency);
        },
        getCurrency({ commit }) {
            const currency = localStorage.getItem('currency');
            if (!currency)
                return;
            commit('setCurrency', currency);
        }
    }
});