<template>
  <div id="settings">
    <breadcrumbs :name="$t('sidebar.settings')" />

    <placeholder />
  </div>
</template>

<script>
import Breadcrumbs from "@/components/Breadcrumbs";
import Placeholder from "@/components/Placeholder";

export default {
  name: "Settings",
  components: {
    Breadcrumbs,
    Placeholder,
  },
};
</script>