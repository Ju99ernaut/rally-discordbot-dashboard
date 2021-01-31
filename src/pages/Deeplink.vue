<template>
  <div
    class="min-h-screen min-w-full bg-gray-100 dark:bg-gray-900 flex flex-col justify-center sm:p-10"
  >
    <div
      class="relative w-full max-w-full lg:max-w-6xl xl:max-w-screen-2xl mx-auto"
    >
      <div
        class="absolute inset-0 -mr-3.5 bg-gradient-to-r from-red-100 to-red-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:rotate-3 sm:rounded-3xl"
      ></div>
      <div class="relative bg-white dark:bg-gray-800 shadow-lg sm:rounded-3xl">
        <div class="flex items-center justify-start pt-6 pl-6">
          <span class="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
          <span class="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
          <span class="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
        </div>

        <div class="px-20 py-6">
          <!-- nav -->
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-center">
              <div
                class="flex items-center justify-center text-3xl font-bold text-true-gray-800 dark:text-gray-100"
              >
                <img
                  class="w-10 h-10 mr-1 text-blue-700"
                  src="@/assets/space.png"
                  alt="logo"
                />
                Rally
              </div>
            </div>
            <div class="hidden md:flex items-center justify-center">
              <!-- <a
                :href="Home"
                class="mr-5 text-lg font-medium text-true-gray-800 dark:text-gray-100 hover:text-cool-gray-700 transition duration-150 ease-in-out"
                >{{ $t("deeplink.Home") }}</a
              > -->
              <a
                href="https://discord.gg/R7dHmKA5aJ"
                class="px-6 py-3 rounded-3xl font-medium bg-gradient-to-b from-red-600 to-red-700 hover:from-red-900 text-white outline-none focus:outline-none hover:shadow-md hover:from-true-gray-900 transition duration-200 ease-in-out"
              >
                {{ $t("deeplink.Help") }}
              </a>
            </div>
          </div>
          <!-- /nav -->

          <!-- hero section -->
          <div class="mr-5 py-5">
            <label
              for="fname"
              class="text-xl font-bold text-true-gray-800 dark:text-gray-100"
              >Coin Name</label
            ><br />
            <div class="py-2" />
            <input
              type="text"
              id="FCoinName"
              name="fname"
              value=""
              class="px-6 py-3 rounded-3xl"
            /><br />
            <!-- <select
              type="text"
              id="FCoinName"
              name="fname"
              value=""
              class="px-6 py-3 rounded-3xl"
            >

            <option v-for="item in filters" :value="item" v-bind=> {{item}} </option>

            </select> -->
            
            <br />
            <div class="py-2" />
            <label
              for="fname"
              class="text-xl font-bold text-true-gray-800 dark:text-gray-100"
              >Currency Type</label
            ><br />
            <div class="py-2" />
            <input
              type="text"
              id="FCurrencyType"
              name="fname"
              value=""
              class="px-6 py-3 rounded-3xl"
            /><br />
            <div class="py-2" />
            <label
              for="fname"
              class="text-xl font-bold text-true-gray-800 dark:text-gray-100"
              >Ammount</label
            ><br />
            <div class="py-2" />
            <input
              type="text"
              id="FAmmount"
              name="fname"
              value=""
              class="px-6 py-3 rounded-3xl"
            /><br />
            <div class="py-2" />
            <label
              for="fname"
              class="text-xl font-bold text-true-gray-800 dark:text-gray-100"
              >Memo</label
            ><br />
            <div class="py-2" />
            <input
              type="text"
              id="FMemo"
              name="fname"
              value=""
              class="px-6 py-3 rounded-3xl"
            /><br />
            <div class="py-2" />
            <label
              for="fname"
              class="text-xl font-bold text-true-gray-800 dark:text-gray-100"
              >Generated Link</label
            ><br />
            <label
              id="flink"
              class="text-xl font-bold text-true-gray-800 dark:text-gray-100"
              ></label
            ><br />
            <div class="py-2" />
            <a
              v-on:click="CheckUrl"
              class="px-12 py-3 rounded-3xl font-medium bg-gradient-to-b from-red-600 to-red-700 hover:from-red-900 text-white outline-none focus:outline-none hover:shadow-md hover:from-true-gray-900 transition duration-200 ease-in-out"
              >CheckUrl</a
            >
            <div class="py-4" />
            <!-- </div> -->
          </div>
          <!-- /hero section -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import queryString from "@/utils/queryString";
import config from "@/config";

export default {
  name: "Landing",
  computed: {
    ...mapGetters({ auth: "ifAuthenticated" }),
    ...mapState(["user", "stateParam"]),
    state() {
      return btoa(this.stateParam);
    },
    username() {
      return this.user
        ? `${this.user.username}#${this.user.discriminator}`
        : "Anonymous";
    },
    loginUrl() {
      const loginParams = {
        client_id: config.clientId,
        redirect_uri: config.home,
        response_type: "token",
        scope: "identify guilds",
        state: this.state,
      };
      return `${config.discordApi}/oauth2/authorize${queryString(loginParams)}`;
    }, 


  },
  data() {
    return {
      botUrl: `https://discord.com/api/oauth2/authorize?client_id=${config.clientId}&permissions=268438560&scope=bot`,
      // filters : ["a","b","c"]
    };
  },
  methods : {

    CheckUrl(){
      var CoinName,CurrencyType,Ammount,Memo;
      CoinName = document.getElementById("FCoinName").value;
      CurrencyType = document.getElementById("FCurrencyType").value;
      Ammount = document.getElementById("FAmmount").value;
      Memo = document.getElementById("FMemo").value;
      if(CoinName || CurrencyType || Ammount || Memo){
        var url = "https://www.rally.io/creator/"+CoinName+"?inputType="+CurrencyType+"&amount="+Ammount+"note="+Memo
        document.getElementById("flink").innerHTML = url
      } else {
        document.getElementById("flink").innerHTML = "Error! fill all filds"
      }
      return url
    }
  }
};
</script>