<template>
  <div id="commands">
    <div class="flex justify-between">
      <breadcrumbs :name="$t('sidebar.commands')" />

      <div
        class="relative inline-block w-12 mr-2 mt-2 align-middle select-none transition duration-200 ease-in"
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
      </div>
    </div>

    <!-- Ideally get commands from API the use v-for -->
    <Command
      :id="'switch1'"
      :command="'help'"
      :description="'List all available commands'"
      :checked="true"
    />
    <Command
      :id="'switch2'"
      :command="'set_channel_mapping'"
      :description="'<coin name> <coin amount> <channel name>. Set a mapping between coin and channel. Channel membership will be constantly updated.'"
      :checked="true"
    />
    <Command
      :id="'switch3'"
      :command="'one_time_channel_mapping'"
      :description="'<coin name> <coin amount> <channel name>. Grant/Deny access to a channel instantly'"
      :checked="true"
    />
    <Command
      :id="'switch4'"
      :command="'unset_channel_mapping'"
      :description="'<coin name> <coin amount> <channel name>. Unset a mapping between a coin and channel'"
      :checked="true"
    />
    <Command
      :id="'switch5'"
      :command="'get_channel_mappings'"
      :description="'Get channel mappings'"
      :checked="true"
    />
    <Command
      :id="'switch5'"
      :command="'set_rally_id'"
      :description="'Set your rally id'"
      :checked="true"
    />
    <Command
      :id="'switch6'"
      :command="'set_role_mapping'"
      :description="'<coin name> <coin ammount> <role name>. Set a mapping between coin and role. Roles will be constantly updated'"
      :checked="true"
    />
    <Command
      :id="'switch7'"
      :command="'one_time_role_mapping'"
      :description="'<coin name> <coin amount> <role name>. Set a mapping to be applied one instantly'"
      :checked="true"
    />
    <Command
      :id="'switch8'"
      :command="'unset_role_mapping'"
      :description="'<coin name> <coin amount> <role name>. Unset a mapping between a coin and role'"
      :checked="true"
    />
    <Command
      :id="'switch9'"
      :command="'get_role_mappings'"
      :description="'Get role mappings'"
      :checked="true"
    />
    <Command
      :id="'switch10'"
      :command="'update'"
      :description="'Force an immediate update'"
      :checked="true"
    />
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