<template>
  <div id="commands">
    <div class="flex justify-between">
      <breadcrumbs :name="$t('sidebar.commands')" />

      <div
        class="relative inline-block w-12 mr-2 mt-2 align-middle select-none transition duration-200 ease-in"
      >
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        />
        <label
          for="toggle"
          class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
        ></label>
      </div>
    </div>

    <Command :command="'#send'" :description="'send coin to someone else'" />
    <Command :command="'#donate'" :description="'doante coin to creator'" />
    <Command :command="'#flex'" :description="'display coin balance'" />
    <Command
      :command="'#top'"
      :description="'display members with the most coin'"
    />
    <Command :command="'#user'" :description="'shows user info'" />
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
import Command from "@/components/Command";

export default {
  name: "Commands",
  components: {
    Breadcrumbs,
    Command,
  },
};
</script>