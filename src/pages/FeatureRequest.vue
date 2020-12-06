<template>
  <div id="feature-request">
    <breadcrumbs :name="$t('sidebar.featureRequest')" />

    <placeholder />
  </div>
</template>

<script>
import Breadcrumbs from "@/components/Breadcrumbs";
import Placeholder from "@/components/Placeholder";

export default {
  name: "FeatureRequest",
  components: {
    Breadcrumbs,
    Placeholder,
  },
};
</script>