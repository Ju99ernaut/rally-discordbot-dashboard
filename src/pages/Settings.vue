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
        class="mt-4 bg-red-500 hover:bg-red-600 focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow"
        @click="onReset"
      >
        {{ $t("settings.reset") }}
      </button>
    </div>
    <div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <p class="text-xl mb-4">{{ $t("setup.coin") }}</p>
      <div class="flex">
        <label class="block mr-4 w-1/2 text-sm">
          <span class="text-gray-700 dark:text-gray-400">{{
            $t("dashboard.default")
          }}</span>
          <select
            ref="coins"
            class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
            @change="setDefaultCoin"
          >
            <template v-if="coins.length">
              <option
                v-for="(coin, index) in coins"
                :key="coin.rnbUserId"
                :value="coin.coinSymbol"
                :selected="index === currentCoin"
              >
                {{ coin.coinSymbol }}
              </option>
            </template>
            <option v-else>{{ $t("dashboard.loading") }}...</option>
          </select>
        </label>
        <label class="block w-1/2 text-sm">
          <span class="text-gray-700 dark:text-gray-400">{{
            $t("settings.currency")
          }}</span>
          <select
            ref="currencies"
            class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
            @change="setDefaultCurrency"
          >
            <template v-if="currencies.length">
              <option
                v-for="(currency, index) in currencies"
                :key="index"
                :value="currency.value"
                :selected="index === currentCurrency"
              >
                {{ currency.label }}
              </option>
            </template>
            <option v-else>{{ $t("dashboard.loading") }}...</option>
          </select>
        </label>
      </div>
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
    ...mapState(["currentGuildId", "token", "coins", "currentCoin"]),
    ...mapGetters({ auth: "ifAuthenticated" }),
  },
  data() {
    return {
      defaultPrefix: "$",
      currentPrefix: "",
      botEnabled: true,
      currencies: [{ value: "usd", label: "USD" }],
      currentCurrency: 0,
    };
  },
  methods: {
    onBotToggle() {
      //toggle bot endpoint
      if (!this.currentGuildId || !this.auth) {
        this.$toast.info("No guild has been selected");
        return;
      }

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
          this.$toast.warning("Failed to toggle bot. Are you offline?")
        );
    },
    onPrefixChange() {
      //change prefix endpoint
      if (!this.currentGuildId || !this.auth) {
        this.$toast.info("No guild has been selected");
        return;
      }

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
          this.$toast.warning("Failed to change prefix. Are you offline?")
        );
    },
    onReset() {
      //change settings to default
      if (!this.currentGuildId || !this.auth) {
        this.$toast.info("No guild has been selected");
        return;
      }

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
        .catch(() => this.$toast.warning("Failed to reset. Are you offline?"));
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
        .catch(() =>
          this.$toast.warning("Failed to refresh. Are you offline?")
        );

      fetch(`${config.botApi}/mappings/coin/${val}`, {
        headers: {
          authorization: this.token,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.coinKind) {
            this.$refs.coins.value = response.coinKind;
          }
        })
        .catch(() =>
          this.$toast.warning("Failed to refresh. Are you offline?")
        );
    },
    setDefaultCoin() {
      this.$store.dispatch("setDefaultCoin", this.coins[this.currentCoin]);
      this.$toast.success("Default coin set in local storage!");
      //set default coin on API
      if (!this.auth || !this.currentGuildId) return;

      fetch(
        `${config.botApi}/mappings/coin${queryString({
          guildId: this.currentGuildId,
        })}`,
        {
          method: "POST",
          headers: {
            authorization: this.token,
          },
          body: JSON.stringify({
            coinKind: this.coins[this.currentCoin].coinSymbol,
          }),
        }
      )
        .then(() => this.$toast.success("Default coin set on server!"))
        .catch(() =>
          this.$toast.warning("Failed to set default coin. Are you offline?")
        );
    },
    setDefaultCurrency() {
      this.$store.dispatch(
        "setCurrency",
        this.currencies[this.currentCurrency].value
      );
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