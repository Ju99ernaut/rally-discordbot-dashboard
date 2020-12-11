<template>
  <div id="logs">
    <breadcrumbs :name="$t('sidebar.logs')" />

    <div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <p class="text-xl mb-4">Rally Network {{ $t("sidebar.logs") }}</p>
      <!-- component -->
      <div class="relative m-8">
        <div
          class="border-r-2 border-gray-200 border-dotted absolute h-full top-0 z-0"
          style="left: 7px"
        ></div>
        <ul class="list-none m-0 p-0">
          <li class="mb-2" v-for="log in logs" :key="log.id">
            <div class="flex items-center mb-1">
              <div
                class="bg-red-600 rounded-full h-4 w-4 border-gray-200 border-2 z-10"
              ></div>
              <div class="flex-1 ml-4 font-medium">
                {{ log.completedDate || log.createdDate }}
              </div>
            </div>
            <div class="ml-12">
              {{ log.status }} - {{ log.actionType }}
              {{
                log.actionAmountOfCoin
                  ? ": " + log.actionAmountOfCoin + " coins"
                  : ""
              }}
              {{
                log.actionCostInCents
                  ? ": " + log.actionCostInCents + " cents"
                  : ""
              }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from "@/components/Breadcrumbs";
//import fetch from "@/utils/fetch";

export default {
  name: "Logs",
  components: {
    Breadcrumbs,
  },
  data() {
    return {
      logs: [],
    };
  },
  mounted() {
    fetch("https://api.rally.io/v1/creator_coins/PRO/network_activity")
      .then((res) => res.json())
      .then((response) => {
        this.logs = response;
      })
      .catch(console.error);
  },
};
</script>