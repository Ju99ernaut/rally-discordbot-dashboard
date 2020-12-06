<template>
  <div id="setup">
    <breadcrumbs :name="$t('sidebar.setup')" />

    <placeholder />
  </div>
</template>

<script>
import Breadcrumbs from "@/components/Breadcrumbs";
import Placeholder from "@/components/Placeholder";

export default {
  name: "Setup",
  components: {
    Breadcrumbs,
    Placeholder,
  },
};
</script>