<template>
  <div id="app" :class="dark ? 'theme-dark' : ''">
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
import fetch from "@/utils/fetch";
import config from "@/config";

export default {
  name: "app",
  computed: {
    ...mapState(["dark"]),
  },
  beforeMount() {
    const fragment = new URLSearchParams(window.location.hash.slice(1));

    if (fragment.has("access_token")) {
      const accessToken = fragment.get("access_token");
      const tokenType = fragment.get("token_type");
      const urlState = fragment.get("state");
      const stateParam = localStorage.getItem("stateParam");
      if (stateParam !== atob(decodeURIComponent(urlState))) {
        this.$toast.error("You may be under a CRSF attack please login again");
        return console.log("CRSF attack!!!");
      }

      fetch(`${config.discordApi}/users/@me`, {
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
          window.location.hash = "";
        })
        .catch(() =>
          this.$toast.error(
            "Failed to login. Please check connection and try again!"
          )
        );
    } else {
      this.$store.dispatch("autoLogin");
    }
    this.$store.dispatch("setPreferedTheme");
  },
  mounted() {
    this.$store.dispatch("setState");
    this.$toast.info("State has been reset");
  },
};
</script>
