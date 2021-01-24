<template>
  <div id="logs">
    <breadcrumbs :name="$t('sidebar.logs')" />

    <button
      name="refresh"
      @click="refresh"
      class="bg-red-500 hover:bg-red-600 focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow"
    >
      {{ $t("logs.refresh") }}
    </button>

    <div
      class="px-4 py-3 mt-5 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      <p class="text-xl mb-4">
        Rally {{ $t("logs.network") }} {{ $t("sidebar.logs") }} for ${{ coin }}
      </p>
      <!-- component -->
      <div class="relative m-8">
        <div
          class="border-r-2 border-gray-200 border-dotted absolute h-full top-0 z-0"
          style="left: 7px"
        ></div>
        <ul class="list-none m-0 p-0">
          <template v-if="logs.length">
            <li class="mb-2" v-for="log in logs" :key="log.id">
              <div class="flex items-center mb-1">
                <div
                  class="bg-red-600 rounded-full h-4 w-4 border-gray-200 border-2 z-10"
                ></div>
                <div class="flex-1 ml-4 font-medium">
                  {{
                    new Date(log.completedDate || log.createdDate).toUTCString()
                  }}
                </div>
              </div>
              <div class="ml-12">
                {{ log.status }} action "{{ log.actionType }}"
                {{
                  log.actionAmountOfCoin
                    ? ", amounting to " + log.actionAmountOfCoin + " coins"
                    : ""
                }}
                {{
                  log.actionCostInCents
                    ? ", amounting to " + log.actionCostInCents + " cents"
                    : ""
                }}
              </div>
            </li>
          </template>
          <template v-else>
            <div class="balls">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.balls {
  width: 3.5em;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}

.balls div {
  width: 0.8em;
  height: 0.8em;
  border-radius: 50%;
  background-color: #fc2f70;
  transform: translateY(-100%);
  animation: wave 0.8s ease-in-out alternate infinite;
}

.balls div:nth-of-type(1) {
  animation-delay: -0.4s;
}

.balls div:nth-of-type(2) {
  animation-delay: -0.2s;
}

@keyframes wave {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(100%);
  }
}
</style>

<script>
import Breadcrumbs from "@/components/Breadcrumbs";
import fetch from "@/utils/fetch";
import config from "@/config";
import { mapState } from "vuex";

export default {
  name: "Logs",
  components: {
    Breadcrumbs,
  },
  computed: {
    ...mapState(["coins", "currentCoin"]),
    coin() {
      return this.coins[this.currentCoin].coinSymbol;
    },
  },
  data() {
    return {
      logs: [],
    };
  },
  methods: {
    refresh() {
      this.$toast.info("Refreshing...");
      fetch(
        `${config.rallyApi}/creator_coins/${
          this.coins[this.currentCoin].coinSymbol
        }/network_activity`
      )
        .then((res) => res.json())
        .then((response) => {
          this.logs = response;
        })
        .catch(() =>
          this.$toast.warning("Failed to refresh. Are you offline?")
        );
    },
  },
  mounted() {
    this.refresh();
  },
};
</script>