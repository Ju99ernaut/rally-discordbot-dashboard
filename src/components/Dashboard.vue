<template>
  <div class="leading-normal tracking-normal" id="main-body">
    <div class="flex flex-wrap text-gray-500 dark:text-gray-400">
      <Sidebar />

      <div
        class="w-full bg-gray-200 dark:bg-gray-900 pl-0 lg:pl-64 min-h-screen"
        :class="sideBarOpen ? 'overlay' : ''"
        id="main-content"
      >
        <Navbar />

        <div class="min-h p-6 bg-gray-200 dark:bg-gray-900">
          <keep-alive include="DashboardHome,Logs" :max="2">
            <router-view />
          </keep-alive>
        </div>

        <Footer />
      </div>
    </div>
  </div>
</template>

<style scoped>
.min-h {
  min-height: calc(100% - 8rem);
}
</style>

<script>
import { mapState } from "vuex";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default {
  name: "Dashboard",
  computed: {
    ...mapState(["sideBarOpen"]),
  },
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
};
</script>
