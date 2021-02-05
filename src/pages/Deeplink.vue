<template>
  <div>
    <breadcrumbs :name="$t('sidebar.deeplink')" />
    <div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <label class="text-xl font-bold text-true-gray-800 dark:text-gray-100">{{
        $t("deeplink.coinName")
      }}</label
      ><br />
      <div class="py-2" />
      <select
        type="text"
        id="FCoinName"
        v-model="CoinName"
        name="fname"
        value=""
        class="block mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
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
      <label class="text-xl font-bold text-true-gray-800 dark:text-gray-100">{{
        $t("deeplink.currencyType")
      }}</label
      ><br />
      <div class="py-2" />
      <input
        type="radio"
        id="COIN"
        name="FCurrencyType"
        v-model="CurrencyType"
        value="COIN"
      />
      <label
        for="COIN"
        class="px-2 text-l font-bold text-true-gray-800 dark:text-gray-100"
        >COIN</label
      ><br />
      <input
        type="radio"
        id="USD"
        name="FCurrencyType"
        v-model="CurrencyType"
        value="USD"
      />
      <label
        for="USD"
        class="px-2 text-l font-bold text-true-gray-800 dark:text-gray-100"
        >USD</label
      ><br />
      <div class="py-2" />
      <label class="text-xl font-bold text-true-gray-800 dark:text-gray-100">{{
        $t("deeplink.amount")
      }}</label
      ><br />
      <div class="py-2" />
      <input
        id="FAmmount"
        v-model="Ammount"
        value=""
        type="number"
        class="block mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
      /><br />
      <div class="py-2" />
      <label class="text-xl font-bold text-true-gray-800 dark:text-gray-100">{{
        $t("deeplink.memo")
      }}</label
      ><br />
      <div class="py-2" />
      <input
        type="text"
        id="FMemo"
        v-model="Memo"
        name="fname"
        value=""
        class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
      /><br />
      <div class="py-2" />
      <label class="text-xl font-bold text-true-gray-800 dark:text-gray-100">
        {{ $t("deeplink.generatedLink") }} </label
      ><br />
      <label
        id="flink"
        class="text-xl font-bold text-true-gray-800 dark:text-gray-100"
      >
        {{ url }} </label
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
import Breadcrumbs from "@/components/Breadcrumbs";

export default {
  name: "Deeplink",
  components: {
    Breadcrumbs,
  },
  computed: {
    ...mapState(["coins"]),
  },
  data() {
    return {
      CoinName: "",
      CurrencyType: "",
      Ammount: "",
      Memo: "",
      url: "URL here",
    };
  },
  methods: {
    CheckUrl() {
      var CoinName = this.CoinName;
      var CurrencyType = this.CurrencyType;
      var Ammount = this.Ammount;
      var Memo = this.Memo;
      if (CoinName && CurrencyType && !isNaN(Ammount) && Ammount != 0) {
        this.url =
          "https://www.rally.io/creator/?" +
          CoinName +
          "?inputType=" +
          CurrencyType +
          "&amount=" +
          Ammount;
        if (Memo) {
          this.url = this.url + "&note=" + Memo;
        }
      } else {
        this.url = "Error! fill all filds";
      }
    },
  },
};
</script>