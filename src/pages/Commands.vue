<template>
  <div id="commands">
    <breadcrumbs :name="$t('sidebar.commands')" />

    <placeholder />
  </div>
</template>

<script>
import Breadcrumbs from "@/components/Breadcrumbs";
import Placeholder from "@/components/Placeholder";

export default {
  name: "Commands",
  components: {
    Breadcrumbs,
    Placeholder,
  },
};
</script>