<template>
  <div id="app" :class="dark ? 'theme-dark' : ''">
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
import fetch from "@/utils/fetch";

export default {
  name: "app",
  computed: {
    ...mapState(["dark"]),
  },
  mounted() {
    const fragment = new URLSearchParams(window.location.hash.slice(1));

    if (fragment.has("access_token")) {
      const accessToken = fragment.get("access_token");
      const tokenType = fragment.get("token_type");
      //const urlState = fragment.get("state");
      //const stateParam = localStorage.getItem("stateParam");
      //if (stateParam !== atob(decodeURIComponent(urlState))) {
      //  return console.log("CRSF attack!!!");
      //}

      fetch("https://discord.com/api/users/@me", {
        headers: {
          authorization: `${tokenType} ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          const user = response;
          this.$store.dispatch("login", {
            token: `${tokenType} ${accessToken}`,
            userId: user.id,
            user,
            username: user.username,
          });
        })
        .catch(console.error);
    } else {
      this.$store.dispatch("autoLogin");
    }
    this.$store.dispatch("setState");
  },
};
</script>
