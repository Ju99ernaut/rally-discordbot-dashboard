<template>
  <div id="home">
    <breadcrumbs :name="$t('sidebar.dashboard')" />

    <Modal
      :show.sync="modalVisible"
      :closeBtn="true"
      mdlTitle="Info"
      mdlContent="Set global default coin and currency"
      mdlType="info"
    >
      <div slot="mdlBody">
        <div class="px-4 py-3 mb-8">
          <label class="block text-sm">
            <span class="text-gray-700 dark:text-gray-400">{{
              $t("dashboard.creatorCoin")
            }}</span>
            <select
              class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
              @change="setCoin"
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
          <label class="block text-sm">
            <span class="text-gray-700 dark:text-gray-400">{{
              $t("settings.currency")
            }}</span>
            <select
              ref="currencies"
              v-model="currentCurrency"
              class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
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
      <button
        slot="actionBtn"
        type="button"
        name="confirm"
        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm bg-green-600 hover:bg-green-700 focus:ring-green-500"
        @click="setDefaults"
      >
        Confirm
      </button>
    </Modal>

    <div class="lg:flex justify-between items-center mb-6">
      <p class="text-2xl font-semibold mb-2 lg:mb-0">
        {{ $t("dashboard.welcome") }}, {{ username }}!
      </p>
      <router-link
        name="to-logs"
        tag="button"
        :to="{ path: 'logs' }"
        class="bg-red-500 hover:bg-red-600 focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow"
      >
        {{ $t("dashboard.logs") }}
      </router-link>
    </div>

    <div class="flex justify-between items-center mb-6">
      <div class="w-full xl:w-4/6">
        <label class="block mb-5 text-sm">
          <span class="text-gray-700 dark:text-gray-400">{{
            $t("dashboard.creatorCoin")
          }}</span>
          <select
            ref="coins"
            class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
            @change="setCoin"
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
      </div>
      <div class="hidden sm:flex justify-end w-1/2 xl:w-1/6 py-5">
        <button
          name="get-coin-info"
          @click="refresh()"
          class="bg-red-500 hover:bg-red-600 focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow"
        >
          {{ $t("logs.refresh") }}
        </button>
      </div>
      <div class="hidden sm:flex justify-end w-1/2 xl:w-1/6 py-5">
        <button
          name="set-default-coin"
          @click="setDefaultCoin"
          class="bg-red-500 hover:bg-red-600 focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow"
        >
          {{ $t("dashboard.default") }}
        </button>
      </div>
    </div>

    <!-- Cards -->
    <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      <!-- Card -->
      <div
        class="flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
      >
        <div
          class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div>
          <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            {{ $t("dashboard.balance") }}
          </p>
          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
            $ {{ balance || "_" }}
          </p>
        </div>
      </div>
      <!-- Card -->
      <div
        class="flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
      >
        <div
          class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"
            ></path>
          </svg>
        </div>
        <div>
          <p class="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
            {{ $t("dashboard.rewards") }}
          </p>
          <select
            class="w-full p-1 text-xs dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700 form-select focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
            v-model="currentRewards"
          >
            <template v-if="rewards">
              <option
                v-for="(key, index) in Object.keys(rewards)"
                :key="index"
                :value="key"
                :selected="index === currentRewards"
              >
                {{ key }}
              </option>
            </template>
            <option v-else>{{ $t("dashboard.loading") }}...</option>
          </select>
          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
            $ {{ rewardsDisplay || "_" }}
          </p>
        </div>
      </div>
      <!-- Card -->
      <div
        class="flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
      >
        <div
          class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
            ></path>
          </svg>
        </div>
        <div>
          <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            {{ $t("dashboard.buys") }}/{{ $t("dashboard.sells") }}
          </p>
          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
            $ {{ volume || "_" }}
          </p>
        </div>
      </div>
      <!-- Card -->
      <div
        class="flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
      >
        <div
          class="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
            ></path>
          </svg>
        </div>
        <div>
          <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            {{ $t("dashboard.holders") }}
          </p>
          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {{ holders || "_" }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex">
      <label class="w-full xl:w-1/4 block mb-3 text-sm">
        <span class="text-gray-700 dark:text-gray-400">{{
          $t("dashboard.chart")
        }}</span>
        <select
          class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
          v-model="chartIdx"
        >
          <option value="rly" selected="true">Rally</option>
          <option value="cc">{{ $t("dashboard.creatorCoin") }}</option>
        </select>
      </label>

      <label
        v-if="chartIdx === 'rly'"
        class="w-full xl:w-1/4 block ml-3 mb-3 text-sm"
      >
        <span class="text-gray-700 dark:text-gray-400">{{
          $t("dashboard.period")
        }}</span>
        <select
          class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
          v-model="days"
        >
          <option value="1" selected="true">24h</option>
          <option value="7">7D</option>
          <option value="30">1M</option>
        </select>
      </label>
    </div>

    <div class="flex flex-wrap -mx-3">
      <div class="w-full xl:w-1/2 px-3">
        <div
          class="w-full bg-white rounded-lg shadow-md dark:bg-gray-800 p-4 mb-8 xl:mb-0"
        >
          <p class="text-xl mb-4">
            {{
              chartIdx === "rly"
                ? "Rally " + $t("dashboard.marketCaps")
                : coins[currentCoin].coinSymbol + " " + $t("dashboard.prices")
            }}
          </p>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              chart-id="green-line-chart"
              :chart-data="greenLineChart.chartData"
              :extra-options="greenLineChart.extraOptions"
            >
            </line-chart>
          </div>
        </div>
      </div>

      <div class="w-full xl:w-1/2 px-3">
        <div
          class="w-full bg-white rounded-lg shadow-md dark:bg-gray-800 p-4 mb-8 xl:mb-0"
        >
          <p class="text-xl mb-4">
            {{
              chartIdx === "rly"
                ? "Rally " + $t("dashboard.volumes")
                : coins[currentCoin].coinSymbol + " " + $t("dashboard.rewards")
            }}
          </p>
          <div class="chart-area">
            <bar-chart
              style="height: 100%"
              chart-id="blue-bar-chart"
              :chart-data="blueBarChart.chartData"
              :extra-options="blueBarChart.extraOptions"
            >
            </bar-chart>
          </div>
        </div>
      </div>

      <div v-if="chartIdx === 'rly'" class="w-full mt-8 px-3">
        <div
          class="w-full bg-white rounded-lg shadow-md dark:bg-gray-800 p-4 mb-8 xl:mb-0"
        >
          <p class="text-xl mb-4">Rally {{ $t("dashboard.prices") }}</p>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              chart-id="purple-line-chart"
              :chart-data="purpleLineChart.chartData"
              :extra-options="purpleLineChart.extraOptions"
            >
            </line-chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-area {
  height: 250px;
}
</style>

<script>
import { mapState, mapGetters } from "vuex";

import fetch from "@/utils/fetch";
import coinData from "@/utils/coinData";
import queryString from "@/utils/queryString";

import Breadcrumbs from "@/components/Breadcrumbs";
import Modal from "@/components/Modal";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";

export default {
  name: "DashboardHome",
  components: {
    Breadcrumbs,
    Modal,
    LineChart,
    BarChart,
  },
  computed: {
    ...mapState([
      "user",
      "coins",
      "currentCoin",
      "defaultCoin",
      "currentGuildId",
      "token",
      "currency",
    ]),
    ...mapGetters({ auth: "ifAuthenticated" }),
    username() {
      return this.user ? this.user.username : "Anonymous";
    },
    rewardsDisplay() {
      return (
        parseFloat(this.rewards[this.currentRewards]).toFixed(2).toString() ||
        ""
      );
    },
    purpleLineChart() {
      return {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
          labels: this.priceLabels,
          datasets: [
            {
              label: "Price",
              fill: true,
              backgroundColor: "rgba(52,70,117,0.2)",
              borderColor: config.colors.default,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.default,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.default,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 0,
              data: this.priceData,
            },
          ],
        },
      };
    },
    greenLineChart() {
      return {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          labels: this.capLabels,
          datasets: [
            {
              label: "Market Cap",
              fill: true,
              backgroundColor: "rgba(0,242,195,0.1)",
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 0,
              data: this.capData,
            },
          ],
        },
      };
    },
    blueBarChart() {
      return {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: this.volumeLabels,
          datasets: [
            {
              label: "Volume",
              fill: true,
              backgroundColor: "rgba(29,140,248,0.1)",
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: this.volumeData,
            },
          ],
        },
      };
    },
  },
  data() {
    return {
      balance: "",
      donations: "",
      rewards: "",
      volume: "",
      holders: "",
      coinId: "rally-2",
      days: 1,
      priceData: [],
      priceLabels: [],
      volumeData: [],
      volumeLabels: [],
      capData: [],
      capLabels: [],
      modalVisible: false,
      currencies: [{ value: "usd", label: "USD" }],
      currentCurrency: 0,
      currentRewards: "weeklyAccumulatedReward",
      chartIdx: "rly",
    };
  },
  methods: {
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
    setDefaults() {
      this.setDefaultCoin();
      this.$store.dispatch(
        "setCurrency",
        this.currencies[this.currentCurrency].value
      );
      this.modalVisible = false;
    },
    getCoinInfo(defaultCoin = null) {
      const coin = defaultCoin || this.coins[this.currentCoin];

      if (!coin) return;

      fetch(`${config.rallyApi}/users/rally/${coin.rnbUserId}/balance`)
        .then((res) => res.json())
        .then((response) => {
          let bal = 0;
          if (response.forEach)
            response.forEach((amt) => (bal += parseFloat(amt.estimatedInUsd)));
          else bal = parseFloat(response.estimatedInUsd);
          this.balance = bal.toFixed();
        })
        .catch(() =>
          this.$toast.warning("Failed to get balance. Are you offline?")
        );

      fetch(`${config.rallyApi}/creator_coins/${coin.coinSymbol}/summary`)
        .then((res) => res.json())
        .then((response) => {
          this.volume = response.totalSupportVolume;
          this.holders = response.totalSupporters;
        })
        .catch(() =>
          this.$toast.warning("Failed to get summary. Are you offline?")
        );

      fetch(`${config.rallyApi}/creator_coins/${coin.coinSymbol}/rewards`)
        .then((res) => res.json())
        .then((response) => {
          this.rewards = response;
        })
        .catch(() =>
          this.$toast.warning("Failed to get rewards. Are you offline?")
        );
    },
    refresh() {
      this.$toast.info("Refreshing coin info...");
      this.getCoinInfo();
      if (this.chartIdx === "rly") this.getMarketData();
      else this.getCoinMarketData();
    },
    getDefaultCoinInfo() {
      if (this.defaultCoin) {
        this.getCoinInfo(this.defaultCoin);
        this.$nextTick(() => {
          const sel = this.$refs.coins;
          sel.value = this.defaultCoin.coinSymbol;
          sel.dispatchEvent(new Event("change"));
          this.$toast.success("Loaded creator coin symbols");
        });
        return;
      }
      this.getCoinInfo();
    },
    setCoin(e) {
      this.$store.commit("setCurrentCoin", e.target.selectedIndex);
      this.getCoinInfo();
    },
    setChartData(res) {
      const prices = res.prices.map((price) => price[1]); //"prices": [[timestamp, price],...]
      const marketCaps = res.market_caps.map((cap) => cap[1]); //"market_caps:[[timestamp, market_cap],...]"
      const volumes = res.total_volumes.map((vol) => vol[1]); //"total_volumes:[[timestamp, total_volume],...]"
      this.priceLabels = Array(prices.length).fill("");
      this.capLabels = Array(marketCaps.length).fill("");
      this.volumeLabels = Array(volumes.length).fill("");
      this.priceData = prices;
      this.capData = marketCaps;
      this.volumeData = volumes;
    },
    getMarketData() {
      this.$toast.info("Updating market data...");
      const endpoint = `coins/${this.coinId}/market_chart`;
      const chartParams = {
        vs_currency: this.currency,
        days: this.days,
      };
      coinData(endpoint, chartParams, this.setChartData);
    },
    getCoinMarketData() {
      const coin = this.coins[this.currentCoin];

      if (!coin) {
        this.chartIdx = 1;
        this.$toast.warning("Coin not found");
        return;
      }

      fetch(`${config.botApi}/coins/${coin.coinSymbol}/historical_price`)
        .then((res) => res.json())
        .then((response) => {
          this.capData = response.map((price) => parseFloat(price.priceInUSD));
          this.capLabels = Array(response.length).fill("");
        })
        .catch(() =>
          this.$toast.warning("Failed to get data. Are you offline?")
        );

      fetch(
        `${config.rallyApi}/creator_coins/${coin.coinSymbol}/historical_rewards`
      )
        .then((res) => res.json())
        .then((response) => {
          this.volumeData = response.map((reward) =>
            parseFloat(reward.weeklyReward)
          );
          this.volumeLabels = Array(response.length).fill("");
        })
        .catch(() =>
          this.$toast.warning("Failed to get data. Are you offline?")
        );
    },
  },
  mounted() {
    this.getMarketData();
    this.getDefaultCoinInfo();
    this.modalVisible = this.defaultCoin ? false : true;
  },
  watch: {
    coins() {
      this.getDefaultCoinInfo();
    },
    days() {
      this.getMarketData();
    },
    chartIdx(val) {
      // update chart data
      if (val === "rly") this.getMarketData();
      else this.getCoinMarketData();
    },
  },
};
</script>