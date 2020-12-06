<template>
  <div id="controls">
    <breadcrumbs :name="$t('sidebar.controls')" />

    <placeholder />
  </div>
</template>

<script>
import Breadcrumbs from "@/components/Breadcrumbs";
import Placeholder from "@/components/Placeholder";

export default {
  name: "Controls",
  components: {
    Breadcrumbs,
    Placeholder,
  },
};
</script>