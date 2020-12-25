<template>
  <div id="home">
    <breadcrumbs :name="$t('sidebar.dashboard')" />

    <div class="lg:flex justify-between items-center mb-6">
      <p class="text-2xl font-semibold mb-2 lg:mb-0">
        {{ $t("dashboard.welcome") }}, {{ username }}!
      </p>
      <router-link
        tag="button"
        :to="{ path: 'logs' }"
        class="bg-red-500 hover:bg-red-600 focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow"
      >
        {{ $t("dashboard.logs") }}
      </router-link>
    </div>

    <div class="lg:flex justify-between items-center mb-6">
      <div class="w-full xl:w-4/6">
        <label class="block mb-5 text-sm">
          <span class="text-gray-700 dark:text-gray-400"> Creator Coin </span>
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
      <div class="flex justify-end w-full xl:w-1/6 py-5">
        <button
          @click="getCoinInfo()"
          class="bg-red-500 hover:bg-red-600 focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow"
        >
          {{ $t("logs.refresh") }}
        </button>
      </div>
      <div class="flex justify-end w-full xl:w-1/6 py-5">
        <button
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
            $ {{ balance || 0 }}
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
          <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            {{ $t("dashboard.rewards") }}
          </p>
          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
            $ {{ rewards || 0 }}
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
            $ {{ volume || 0 }}
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
            {{ holders || 0 }}
          </p>
        </div>
      </div>
    </div>

    <label class="w-full xl:w-1/4 block mb-3 text-sm">
      <span class="text-gray-700 dark:text-gray-400">{{
        $t("dashboard.period")
      }}</span>
      <select
        class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
        @change="setPeriod"
      >
        <option value="1" selected="true">24h</option>
        <option value="7">7D</option>
        <option value="30">1M</option>
      </select>
    </label>

    <div class="flex flex-wrap -mx-3">
      <div class="w-full xl:w-1/2 px-3">
        <div
          class="w-full bg-white rounded-lg shadow-md dark:bg-gray-800 p-4 mb-8 xl:mb-0"
        >
          <p class="text-xl mb-4">Rally {{ $t("dashboard.marketCaps") }}</p>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              chart-id="green-line-chart"
              :chart-data="greenLineChart.chartData"
              :gradient-colors="greenLineChart.gradientColors"
              :gradient-stops="greenLineChart.gradientStops"
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
          <p class="text-xl mb-4">Rally {{ $t("dashboard.volumes") }}</p>
          <div class="chart-area">
            <bar-chart
              style="height: 100%"
              chart-id="blue-bar-chart"
              :chart-data="blueBarChart.chartData"
              :gradient-colors="blueBarChart.gradientColors"
              :gradient-stops="blueBarChart.gradientStops"
              :extra-options="blueBarChart.extraOptions"
            >
            </bar-chart>
          </div>
        </div>
      </div>

      <div class="w-full mt-8 px-3">
        <div
          class="w-full bg-white rounded-lg shadow-md dark:bg-gray-800 p-4 mb-8 xl:mb-0"
        >
          <p class="text-xl mb-4">Rally {{ $t("dashboard.prices") }}</p>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              chart-id="purple-line-chart"
              :chart-data="purpleLineChart.chartData"
              :gradient-stops="purpleLineChart.gradientStops"
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
import { mapState } from "vuex";

import fetch from "@/utils/fetch";
import coinData from "@/utils/coinData";

import Breadcrumbs from "@/components/Breadcrumbs";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";

export default {
  name: "DashboardHome",
  components: {
    Breadcrumbs,
    LineChart,
    BarChart,
  },
  computed: {
    ...mapState(["user", "coins", "currentCoin", "defaultCoin"]),
    username() {
      return this.user ? this.user.username : "Anonymous";
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
        gradientStops: [1, 0.2, 0],
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
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
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
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: this.volumeData,
            },
          ],
        },
        gradientColors: [
          "rgba(29,140,248,0.5)",
          "rgba(29,140,248,0.05)",
          "rgba(29,140,248,0)",
        ],
        gradientStops: [1, 0.4, 0],
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
      vs_currency: "usd",
      days: 1,
      priceData: [],
      priceLabels: [],
      volumeData: [],
      volumeLabels: [],
      capData: [],
      capLabels: [],
    };
  },
  methods: {
    setDefaultCoin() {
      this.$store.dispatch("setDefaultCoin", this.coins[this.currentCoin]);
      //set default coin on API
      //fetch...
      this.$toast.success("Default coin set!");
    },
    getCoinInfo(defaultCoin = null) {
      const coin = defaultCoin || this.coins[this.currentCoin];
      fetch(`${config.rallyApi}/users/rally/${coin.rnbUserId}/balance`)
        .then((res) => res.json())
        .then((response) => {
          let bal = 0;
          if (response.forEach)
            response.forEach((amt) => (bal += parseFloat(amt.estimatedInUsd)));
          else bal = parseFloat(response.estimatedInUsd);
          this.balance = bal.toFixed();
        })
        .catch(console.error);
      fetch(`${config.rallyApi}/creator_coins/${coin.coinSymbol}/summary`)
        .then((res) => res.json())
        .then((response) => {
          this.volume = response.totalSupportVolume;
          this.holders = response.totalSupporters;
        })
        .catch(console.error);

      fetch(`${config.rallyApi}/creator_coins/${coin.coinSymbol}/rewards`)
        .then((res) => res.json())
        .then((response) => {
          this.rewards = parseFloat(response.lastOneHourEarned).toFixed();
        })
        .catch(console.error);
      this.$toast.info("Refreshing...");
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
      const endpoint = `coins/${this.coinId}/market_chart`;
      const chartParams = {
        vs_currency: this.vs_currency,
        days: this.days,
      };
      coinData(endpoint, chartParams, this.setChartData);
      this.$toast.info("Updating market data...");
    },
    setPeriod(e) {
      this.days = e.target.value;
    },
  },
  mounted() {
    this.getMarketData();
    this.getDefaultCoinInfo();
  },
  watch: {
    coins() {
      this.getDefaultCoinInfo();
    },
    days() {
      this.getMarketData();
    },
  },
};
</script>