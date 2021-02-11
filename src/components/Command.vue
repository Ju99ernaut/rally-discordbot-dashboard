<template>
  <div class="w-full mt-8 px-3">
    <div
      class="w-full flex justify-between rounded-lg shadow-md bg-white dark:bg-gray-800 p-4 mb-8 xl:mb-0"
    >
      <div>
        <p class="text-lg mb-1">{{ command }}</p>
        <p class="text-sm mb-1">{{ description }}</p>
      </div>
      <div v-if="auth" class="hidden sm:flex mt-3">
        <div>
          <button
            disabled
            :name="command"
            type="button"
            class="mr-4 w-full inline-flex justify-center rounded-md border border-gray-500 shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            {{ $t("commands.edit") }}
          </button>
        </div>
        <div>
          <div
            class="relative inline-block w-10 mr-2 mt-2 align-middle select-none transition duration-200 ease-in"
          >
            <input
              disabled
              :checked="checked"
              type="checkbox"
              name="toggle"
              :id="id"
              class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              :for="id"
              class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toggle-checkbox:checked {
  right: 0;
  border-color: #969696;
}
.toggle-checkbox:checked + .toggle-label {
  background-color: #969696;
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Command",
  props: {
    id: String,
    command: String,
    description: String,
    checked: Boolean,
  },
  computed: {
    ...mapGetters({ auth: "ifAuthenticated" }),
  },
};
</script>