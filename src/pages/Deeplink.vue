<template>
  <div class="px-20 py-6">

    <div class="flex items-center justify-between">
      <div class="flex items-center justify-center">
        <breadcrumbs :name="$t('sidebar.deeplink')" />
      </div>
    </div>

    <div class="mr-5 py-5">
      <label
        for="fname"
        class="text-xl font-bold text-true-gray-800 dark:text-gray-100"
        >{{ $t("deeplink.coinName") }}</label
      ><br />
      <div class="py-2" />
      <select
        type="text"
        id="FCoinName"
        name="fname"
        value=""
        class="px-6 py-3 rounded-3xl"
      >
        <option
          v-for="item in coins"
          :key="item.coinSymbol"
          :selected="item.coinSymbol === currentCoin"
        >
          {{ item.coinSymbol }}
        </option>
      </select>

      <br />
      <div class="py-2" />
      <label
        for="fname"
        class="text-xl font-bold text-true-gray-800 dark:text-gray-100"
        >{{ $t("deeplink.currencyType") }}</label
      ><br />
      <div class="py-2" />
      <input type="radio" id="COIN" name="FCurrencyType" value="male" />
      <label
        for="COIN"
        class="px-2 text-l font-bold text-true-gray-800 dark:text-gray-100"
        >COIN</label
      ><br />
      <input type="radio" id="USD" name="FCurrencyType" value="female" />
      <label
        for="USD"
        class="px-2 text-l font-bold text-true-gray-800 dark:text-gray-100"
        >USD</label
      ><br />
      <div class="py-2" />
      <label
        for="fname"
        class="text-xl font-bold text-true-gray-800 dark:text-gray-100"
        >{{ $t("deeplink.ammount") }}</label
      ><br />
      <div class="py-2" />
      <input
        id="FAmmount"
        name="fname"
        value=""
        type="number"
        class="px-6 py-3 rounded-3xl"
      /><br />
      <div class="py-2" />
      <label
        for="fname"
        class="text-xl font-bold text-true-gray-800 dark:text-gray-100"
        >{{ $t("deeplink.memo") }}</label
      ><br />
      <div class="py-2" />
      <input
        type="text"
        id="FMemo"
        name="fname"
        value=""
        class="px-6 py-3 rounded-3xl"
      /><br />
      <div class="py-2" />
      <label
        for="fname"
        class="text-xl font-bold text-true-gray-800 dark:text-gray-100"
        >        {{ $t("deeplink.generatedLink") }} </label
      ><br />
      <label
        id="flink"
        class="text-xl font-bold text-true-gray-800 dark:text-gray-100"
      ></label
      ><br />
      <div class="py-2" />
      <button
        name="refresh"
        @click="CheckUrl"
        class="bg-red-500 hover:bg-red-600 focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow"
      >
        {{ $t("deeplink.link") }}
      </button>
      <div class="py-4" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import config from "@/config";
import Breadcrumbs from "@/components/Breadcrumbs";

export default {
  name: "Landing",
  components: {
    Breadcrumbs,
  },
  computed: {
    ...mapState(["user", "stateParam", "coins"]),
    state() {
      return btoa(this.stateParam);
    },
  },
  data() {
    return {
      botUrl: `https://discord.com/api/oauth2/authorize?client_id=${config.clientId}&permissions=268438560&scope=bot`,
    };
  },
  methods: {
    CheckUrl() {
      var CoinName, CurrencyType, Ammount, Memo;
      CoinName = document.getElementById("FCoinName").value;
      CurrencyType = "";
      if (document.getElementById("COIN").checked) {
        CurrencyType = "COIN";
      } else if (document.getElementById("USD").checked) {
        CurrencyType = "USD";
      }
      Ammount = document.getElementById("FAmmount").value;
      Memo = document.getElementById("FMemo").value;
      if (CoinName && CurrencyType && !isNaN(Ammount)) {
        var url =
          "https://www.rally.io/creator/" +
          CoinName +
          "?inputType=" +
          CurrencyType +
          "&amount=" +
          Ammount +
          "note=" +
          Memo;
        document.getElementById("flink").innerHTML = url;
      } else {
        document.getElementById("flink").innerHTML = "Error! fill all filds";
      }
      return url;
    },
  },
  mounted() {
    this.fetchCoins();
  },
};
</script>