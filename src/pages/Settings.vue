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
            disabled
            class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            placeholder="$"
          />
        </label>
        <div
          class="ml-10 block relative inline-block w-12 mr-2 mt-2 align-middle select-none transition duration-200 ease-in"
        >
          <label class="block text-sm">
            <span class="text-gray-700 dark:text-gray-400"
              >{{ $t("settings.enable") }}/{{ $t("settings.disable") }}</span
            >
            <input
              disabled
              checked="true"
              type="checkbox"
              name="toggle"
              id="toggle"
              class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              for="toggle"
              class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </label>
        </div>
      </div>
      <button
        disabled
        type="button"
        class="mt-4 w-full inline-flex justify-center rounded-md border border-gray-500 shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
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
import Breadcrumbs from "@/components/Breadcrumbs";

export default {
  name: "Settings",
  components: {
    Breadcrumbs,
  },
};
</script>