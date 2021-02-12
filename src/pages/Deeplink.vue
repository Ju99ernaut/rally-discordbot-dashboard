<template>
  <div id="deeplink">
    <breadcrumbs :name="$t('sidebar.deeplink')" />

    <div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <label class="block text-sm">
        <span class="text-gray-700 dark:text-gray-400">{{
          $t("deeplink.coinName")
        }}</span>
        <select
          class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
          v-model="coinName"
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

      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">{{
          $t("deeplink.currencyType")
        }}</span>
      </label>

      <div class="flex mt-1">
        <label class="block mr-3 text-sm">
          <input
            type="radio"
            name="currencyType"
            value="COINS"
            v-model="currencyType"
            class="form-radio h-5 w-5 text-red-500"
          />
          <span class="text-gray-700 dark:text-gray-400"> Coins </span>
        </label>

        <label class="block text-sm">
          <input
            type="radio"
            name="currencyType"
            value="USD"
            v-model="currencyType"
            class="form-radio h-5 w-5 text-red-500"
          />
          <span class="text-gray-700 dark:text-gray-400"> USD </span>
        </label>
      </div>

      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">{{
          $t("deeplink.amount")
        }}</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
          placeholder="100"
          type="number"
          v-model="amount"
        />
      </label>

      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">{{
          $t("featureRequest.description")
        }}</span>
        <textarea
          class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
          rows="3"
          :placeholder="$t('deeplink.memo')"
          v-model="memo"
        ></textarea>
      </label>

      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">{{
          $t("deeplink.generatedLink")
        }}</span>
        <div class="flex">
          <input
            class="block w-full mt-1 mr-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
            rows="3"
            placeholder="deeplink"
            v-model="url"
          />
          <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            @click="copy"
            class="w-10 h-10 cursor-pointer bg-red-500 hover:bg-red-600 rounded-lg text-white shadow-lg p-1 mt-3"
          >
            <path
              v-if="iconCopy"
              d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"
            />
            <path
              v-else
              d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </div>
        <a
          v-if="url"
          :href="url"
          target="_blank"
          rel="noopener noreferrer"
          class="flex text-red-500 mt-3"
        >
          {{ $t("setup.go") }}
          <span
            ><svg
              aria-hidden="true"
              focusable="false"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              width="15"
              height="15"
              class="icon outbound"
            >
              <path
                fill="currentColor"
                d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
              ></path>
              <polygon
                fill="currentColor"
                points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
              ></polygon>
            </svg>
            <span class="sr-only">(opens new window)</span></span
          ></a
        >
      </label>

      <button
        name="checkUrl"
        @click="checkUrl"
        class="mt-4 bg-red-500 hover:bg-red-600 focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow"
      >
        {{ $t("deeplink.link") }}
      </button>
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
      coinName: "",
      currencyType: "",
      amount: "",
      memo: "",
      url: "",
      iconCopy: true,
    };
  },
  methods: {
    checkUrl() {
      const { coinName, currencyType, amount, memo } = this;
      if (coinName && currencyType && !isNaN(amount) && amount != 0) {
        this.url = `https://www.rally.io/creator/${coinName}/?inputType=${currencyType}&amount=${amount}`;
        if (memo) {
          this.url = `${this.url}&note=${memo}`;
        }
      } else {
        this.$toast.warning(
          "Failed to generate deeplink, some important fields are missing"
        );
      }
    },
    copy() {
      this.copyToClipboard(this.url);
      this.iconCopy = false;
      setTimeout(() => (this.iconCopy = true), 2000);
    },
    copyToClipboard(str) {
      const el = document.createElement("textarea");
      el.value = str;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    },
  },
};
</script>
