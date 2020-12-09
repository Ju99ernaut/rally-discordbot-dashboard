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
          <li class="mb-2">
            <div class="flex items-center mb-1">
              <div
                class="bg-red-600 rounded-full h-4 w-4 border-gray-200 border-2 z-10"
              ></div>
              <div class="flex-1 ml-4 font-medium">Oct 2020 - Sent 100,000</div>
            </div>
            <div class="ml-12">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Dignissimos tenetur, suscipit atque et nulla dolores unde maiores.
            </div>
          </li>
          <li class="mb-2">
            <div class="flex items-center mb-1">
              <div
                class="bg-red-600 rounded-full h-4 w-4 border-gray-200 border-2 z-10"
              ></div>
              <div class="flex-1 ml-4 font-medium">May 2019 - More money</div>
            </div>
            <div class="ml-12">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Dignissimos tenetur, suscipit atque et nulla dolores unde maiores.
            </div>
          </li>
          <li class="mb-2">
            <div class="flex items-center mb-1">
              <div
                class="bg-red-600 rounded-full h-4 w-4 border-gray-200 border-2 z-10"
              ></div>
              <div class="flex-1 ml-4 font-medium">
                April 2019 - Liquidated 1,000,000,000,000
              </div>
            </div>
            <div class="ml-12">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Dignissimos tenetur, suscipit atque et nulla dolores unde maiores.
            </div>
          </li>
          <li class="mb-2">
            <div class="flex items-center mb-1">
              <div
                class="bg-red-600 rounded-full h-4 w-4 border-gray-200 border-2 z-10"
              ></div>
              <div class="flex-1 ml-4 font-medium">
                Feb 2018 - Recieved 1,000,000
              </div>
            </div>
            <div class="ml-12">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Dignissimos tenetur, suscipit atque et nulla dolores unde maiores.
            </div>
          </li>
          <li class="mb-2">
            <div class="flex items-center mb-1">
              <div
                class="bg-red-600 rounded-full h-4 w-4 border-gray-200 border-2 z-10"
              ></div>
              <div class="flex-1 ml-4 font-medium">
                May 2017 - User123 Flexed
              </div>
            </div>
            <div class="ml-12">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Dignissimos tenetur, suscipit atque et nulla dolores unde maiores.
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from "@/components/Breadcrumbs";

export default {
  name: "Logs",
  components: {
    Breadcrumbs,
  },
};
</script>