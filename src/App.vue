<template>
  <div id="app" :class="dark ? 'theme-dark' : ''">
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "app",
  computed: {
    ...mapState(["dark"]),
  },
};
</script>
