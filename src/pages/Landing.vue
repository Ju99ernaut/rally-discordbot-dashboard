<template>
  <div
    class="min-h-screen min-w-full bg-gray-100 dark:bg-gray-900 flex flex-col justify-center sm:p-10"
  >
    <div
      class="relative w-full max-w-full lg:max-w-6xl xl:max-w-screen-2xl mx-auto"
    >
      <div
        class="absolute inset-0 -mr-3.5 bg-gradient-to-r from-red-100 to-red-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:rotate-3 sm:rounded-3xl"
      ></div>
      <div class="relative bg-white dark:bg-gray-800 shadow-lg sm:rounded-3xl">
        <div class="flex items-center justify-start pt-6 pl-6">
          <span class="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
          <span class="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
          <span class="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
        </div>

        <div class="px-20 py-6">
          <!-- nav -->
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-center">
              <div
                class="flex items-center justify-center text-3xl font-bold text-true-gray-800 dark:text-gray-100"
              >
                <img
                  class="w-10 h-10 mr-1 text-blue-700"
                  src="@/assets/space.png"
                  alt="logo"
                />
                Rally
              </div>
            </div>
            <div class="hidden md:flex items-center justify-center">
              <a
                v-if="auth"
                href="#"
                class="mr-5 text-lg font-medium text-true-gray-800 dark:text-gray-100 hover:text-cool-gray-700 transition duration-150 ease-in-out"
                >{{ username }}</a
              >
              <a
                v-else
                :href="loginUrl"
                class="mr-5 text-lg font-medium text-true-gray-800 dark:text-gray-100 hover:text-cool-gray-700 transition duration-150 ease-in-out"
                >{{ $t("navbar.login") }}</a
              >
              <router-link
                :to="{ path: 'dashboard' }"
                class="px-6 py-3 rounded-3xl font-medium bg-gradient-to-b from-red-600 to-red-700 hover:from-red-900 text-white outline-none focus:outline-none hover:shadow-md hover:from-true-gray-900 transition duration-200 ease-in-out"
              >
                {{ $t("sidebar.dashboard") }}
              </router-link>
            </div>
          </div>
          <!-- /nav -->

          <!-- hero section -->
          <div class="lg:2/6 xl:w-2/4 mt-20 lg:mt-40 lg:ml-16 text-left">
            <div
              class="text-5xl xl:text-6xl font-semibold text-gray-900 dark:text-gray-200 leading-none"
            >
              {{ $t("landing.main") }}
            </div>
            <div
              class="mt-6 text-xl font-light text-true-gray-500 dark:text-white antialiased"
            >
              {{ $t("landing.sub") }}.
            </div>
            <div class="flex">
              <button
                class="mt-6 px-8 py-4 rounded-full font-normal tracking-wide bg-gradient-to-b from-red-600 to-red-700 text-white outline-none focus:outline-none hover:shadow-lg hover:from-red-900 transition duration-200 ease-in-out"
              >
                <a class="flex" :href="botUrl" target="_blank">
                  <svg
                    class="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20.222 0c1.406 0 2.54 1.137 2.607 2.475V24l-2.677-2.273-1.47-1.338-1.604-1.398.67 2.205H3.71c-1.402 0-2.54-1.065-2.54-2.476V2.48C1.17 1.142 2.31.003 3.715.003h16.5L20.222 0zm-6.118 5.683h-.03l-.202.2c2.073.6 3.076 1.537 3.076 1.537-1.336-.668-2.54-1.002-3.744-1.137-.87-.135-1.74-.064-2.475 0h-.2c-.47 0-1.47.2-2.81.735-.467.203-.735.336-.735.336s1.002-1.002 3.21-1.537l-.135-.135s-1.672-.064-3.477 1.27c0 0-1.805 3.144-1.805 7.02 0 0 1 1.74 3.743 1.806 0 0 .4-.533.805-1.002-1.54-.468-2.14-1.404-2.14-1.404s.134.066.335.2h.06c.03 0 .044.015.06.03v.006c.016.016.03.03.06.03.33.136.66.27.93.4.466.202 1.065.403 1.8.536.93.135 1.996.2 3.21 0 .6-.135 1.2-.267 1.8-.535.39-.2.87-.4 1.397-.737 0 0-.6.936-2.205 1.404.33.466.795 1 .795 1 2.744-.06 3.81-1.8 3.87-1.726 0-3.87-1.815-7.02-1.815-7.02-1.635-1.214-3.165-1.26-3.435-1.26l.056-.02zm.168 4.413c.703 0 1.27.6 1.27 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334.002-.74.573-1.338 1.27-1.338zm-4.543 0c.7 0 1.266.6 1.266 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334 0-.74.57-1.338 1.27-1.338z"
                    />
                  </svg>
                  <span>{{ $t("setup.add") }}</span>
                </a>
              </button>
              <router-link
                tag="button"
                :to="{ path: 'dashboard' }"
                class="md:hidden ml-1 mt-6 px-8 py-4 rounded-full font-normal tracking-wide bg-gradient-to-b from-red-600 to-red-700 text-white outline-none focus:outline-none hover:shadow-lg hover:from-red-900 transition duration-200 ease-in-out"
              >
                {{ $t("sidebar.dashboard") }}
              </router-link>
            </div>
          </div>
          <div class="mt-20 text-left"></div>

          <!-- /hero section -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import queryString from "@/utils/queryString";
import config from "@/config";

export default {
  name: "Landing",
  computed: {
    ...mapGetters({ auth: "ifAuthenticated" }),
    ...mapState(["user", "stateParam"]),
    state() {
      return btoa(this.stateParam);
    },
    username() {
      return this.user
        ? `${this.user.username}#${this.user.discriminator}`
        : "Anonymous";
    },
    loginUrl() {
      const loginParams = {
        client_id: config.clientId,
        redirect_uri: config.home,
        response_type: "token",
        scope: "identify guilds",
        state: this.state,
      };
      return `${config.discordApi}/oauth2/authorize${queryString(loginParams)}`;
    },
  },
  data() {
    return {
      botUrl: `https://discord.com/api/oauth2/authorize?client_id=${config.clientId}&permissions=268438560&scope=bot`,
    };
  },
};
</script>