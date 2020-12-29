<template>
  <div id="settings">
    <breadcrumbs :name="$t('sidebar.settings')" />

    <div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <p class="text-xl mb-4">{{ $t("settings.general") }}</p>
      <div class="flex">
        <label class="block w-1/2 text-sm">
          <span class="text-gray-700 dark:text-gray-400">{{
            $t("settings.prefix")
          }}</span>
          <input
            class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            placeholder="$"
            v-model="currentPrefix"
            @change="onPrefixChange"
          />
        </label>
        <div
          class="ml-10 block relative inline-block w-12 mr-2 mt-2 align-middle select-none transition duration-200 ease-in"
        >
          <div class="block text-sm">
            <span class="text-gray-700 dark:text-gray-400"
              >{{ $t("settings.enable") }}/{{ $t("settings.disable") }}</span
            >
            <input
              checked="true"
              type="checkbox"
              name="toggle"
              id="toggle"
              class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              v-model="botEnabled"
              @change="onBotToggle"
            />
            <label
              for="toggle"
              class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
        </div>
      </div>
      <button
        type="button"
        name="reset"
        class="mt-4 w-full inline-flex justify-center rounded-md border border-gray-500 shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
        @click="onReset"
      >
        {{ $t("settings.reset") }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.toggle-checkbox:checked {
  right: 0;
  border-color: #d36868;
}
.toggle-checkbox:checked + .toggle-label {
  background-color: #d36868;
}
</style>

<script>
import { mapState, mapGetters } from "vuex";
import Breadcrumbs from "@/components/Breadcrumbs";

import config from "@/config";
import fetch from "@/utils/fetch";
import queryString from "@/utils/queryString";
import randomString from "@/utils/randomString";

export default {
  name: "Settings",
  components: {
    Breadcrumbs,
  },
  computed: {
    ...mapState(["currentGuildId", "token"]),
    ...mapGetters({ auth: "ifAuthenticated" }),
  },
  data() {
    return {
      defaultPrefix: "$",
      currentPrefix: "",
      botEnabled: true,
    };
  },
  methods: {
    onBotToggle() {
      //toggle bot endpoint
      if (!this.currentGuildId || !this.auth) return;

      fetch(
        `${config.botApi}/mappings/prefix${queryString({
          guildId: this.currentGuildId,
        })}`,
        {
          method: "post",
          headers: {
            authorization: this.token,
          },
          body: JSON.stringify({
            prefix: this.botEnabled ? this.defaultPrefix : randomString(),
          }),
        }
      )
        .then((res) => res.json())
        .then((response) => {
          if (response.prefix) {
            this.currentPrefix = response.prefix;
            this.$toast.success(`Bot has been toggled`);
          } else
            this.$toast.error("An error was encountered. Please try again");
        })
        .catch(() =>
          this.$toast.warn("Failed to toggle bot. Are you offline?")
        );
    },
    onPrefixChange() {
      //change prefix endpoint
      if (!this.currentGuildId || !this.auth) return;

      fetch(
        `${config.botApi}/mappings/prefix${queryString({
          guildId: this.currentGuildId,
        })}`,
        {
          method: "post",
          headers: {
            authorization: this.token,
          },
          body: JSON.stringify({ prefix: this.currentPrefix }),
        }
      )
        .then((res) => res.json())
        .then((response) => {
          if (response.prefix) {
            this.currentPrefix = response.prefix;
            this.botEnabled = this.currentPrefix.length < 15 ? true : false;
            this.$toast.success(
              `Prefix has been updated to ${this.currentPrefix}`
            );
          } else
            this.$toast.error("An error was encountered. Please try again");
        })
        .catch(() =>
          this.$toast.warn("Failed to change prefix. Are you offline?")
        );
    },
    onReset() {
      //change settings to default
      if (!this.currentGuildId || !this.auth) return;

      fetch(
        `${config.botApi}/mappings/prefix${queryString({
          guildId: this.currentGuildId,
        })}`,
        {
          method: "post",
          headers: {
            authorization: this.token,
          },
          body: JSON.stringify({ prefix: this.defaultPrefix }),
        }
      )
        .then((res) => res.json())
        .then((response) => {
          if (response.prefix) {
            this.currentPrefix = response.prefix;
            this.botEnabled = true;
            this.$toast.success("All settings have been reset");
          } else
            this.$toast.error("An error was encountered. Please try again");
        })
        .catch(() => this.$toast.warn("Failed to reset. Are you offline?"));
    },
    refresh(val) {
      if (!this.auth) return;

      fetch(`${config.botApi}/mappings/prefix/${val}`, {
        headers: {
          authorization: this.token,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.prefix) {
            this.currentPrefix = response.prefix;
            this.botEnabled = this.currentPrefix.length < 15 ? true : false;
            this.$toast.info("Settings refreshed");
          } else
            this.$toast.error("An error was encountered. Please try again");
        })
        .catch(() => this.$toast.warn("Failed to refresh. Are you offline?"));
    },
  },
  watch: {
    currentGuildId(val) {
      this.refresh(val);
    },
  },
  mounted() {
    this.currentGuildId && this.refresh(this.currentGuildId);
  },
};
</script>