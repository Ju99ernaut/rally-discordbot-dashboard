<template>
  <div id="logs">
    <breadcrumbs :name="$t('sidebar.logs')" />

    <placeholder />
  </div>
</template>

<script>
import Breadcrumbs from "@/components/Breadcrumbs";
import Placeholder from "@/components/Placeholder";

export default {
  name: "Logs",
  components: {
    Breadcrumbs,
    Placeholder,
  },
};
</script>