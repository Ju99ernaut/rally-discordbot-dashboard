<template>
  <div
    class="w-12 shadow-lg flex flex-col items-center justify-start h-screen bg-gray-100 dark:bg-gray-700 z-40"
    id="channels-nav"
  >
    <img
      v-if="auth"
      :src="avatar"
      alt="avatar"
      class="w-10 h-10 bg-gray-300 dark:bg-gray-900 rounded-full shadow-lg mt-3"
    />
    <svg
      v-else
      viewBox="0 0 16 16"
      class="w-10 h-10 border-2 bg-gray-300 dark:bg-gray-900 rounded-full shadow-lg mt-3"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
      />
    </svg>
    <div class="w-10 h-1 bg-gray-300 dark:bg-gray-800 mt-3"></div>

    <div v-if="auth">
      <img
        v-for="(guild, index) in guilds"
        :key="guild.id"
        :src="`${cdn}/icons/${guild.id}/${guild.icon}.png`"
        alt="guild-icon"
        class="w-8 h-8 cursor-pointer bg-gray-300 dark:bg-gray-900 rounded-full shadow-lg mt-3"
        :class="currentGuild === index ? 'active' : ''"
        @click="setGuild(index)"
      />
    </div>
    <svg
      class="w-8 h-8 cursor-pointer bg-gray-300 dark:bg-gray-900 hover:text-red-500 rounded-full shadow-lg mt-3"
      fill="currentColor"
      viewBox="0 0 16 16"
      @click="$store.dispatch('setGuilds', token)"
    >
      <path
        d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
      />
      <path
        fill-rule="evenodd"
        d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
      />
    </svg>
    <a :href="botUrl" target="_blank">
      <svg
        class="w-10 h-10 cursor-pointer bg-gray-300 dark:bg-gray-900 hover:text-red-500 rounded-full shadow-lg mt-3"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"
        ></path>
      </svg>
    </a>
  </div>
</template>

<style scoped>
.active {
  box-sizing: content-box;
  border: 2px solid #f83f3f;
}
</style>

<script>
import { mapState, mapGetters } from "vuex";
import config from "@/config";

export default {
  name: "Guilds",
  computed: {
    ...mapState(["user", "token", "guilds", "currentGuild"]),
    ...mapGetters({ auth: "ifAuthenticated" }),
    avatar() {
      return this.user
        ? `${this.cdn}/avatars/${this.user.id}/${this.user.avatar}.png`
        : "";
    },
  },
  data() {
    return {
      botUrl: `https://discord.com/api/oauth2/authorize?client_id=${config.clientId}&permissions=268438560&scope=bot`,
      cdn: config.discordCdn,
    };
  },
  methods: {
    setGuild(guildIdx) {
      this.$store.commit("setCurrentGuild", {
        guildIdx,
        guildId: this.guilds[guildIdx].id,
      });
    },
  },
  beforeMount() {
    if (this.auth) this.$store.dispatch("setGuilds", this.token);
  },
};
</script>