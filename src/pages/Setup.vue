<template>
  <div id="setup">
    <breadcrumbs :name="$t('sidebar.setup')" />

    <Modal
      :show.sync="modalVisible"
      :closeBtn="true"
      :mdlTitle="modalTitle"
      :mdlContent="modalContent"
      :mdlType="modalType"
    >
      <button
        slot="actionBtn"
        type="button"
        name="confirm"
        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        :class="
          modalType === 'info'
            ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500 '
            : 'bg-red-600 hover:bg-red-700 focus:ring-red-500 '
        "
        @click="confirm(id)"
      >
        Confirm
      </button>
    </Modal>

    <a
      class="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-red-100 bg-red-500 rounded-lg shadow-md focus:outline-none focus:shadow-outline-red"
      :href="`https://discord.com/channels/${currentGuildId || ''}`"
      target="_blank"
    >
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M20.222 0c1.406 0 2.54 1.137 2.607 2.475V24l-2.677-2.273-1.47-1.338-1.604-1.398.67 2.205H3.71c-1.402 0-2.54-1.065-2.54-2.476V2.48C1.17 1.142 2.31.003 3.715.003h16.5L20.222 0zm-6.118 5.683h-.03l-.202.2c2.073.6 3.076 1.537 3.076 1.537-1.336-.668-2.54-1.002-3.744-1.137-.87-.135-1.74-.064-2.475 0h-.2c-.47 0-1.47.2-2.81.735-.467.203-.735.336-.735.336s1.002-1.002 3.21-1.537l-.135-.135s-1.672-.064-3.477 1.27c0 0-1.805 3.144-1.805 7.02 0 0 1 1.74 3.743 1.806 0 0 .4-.533.805-1.002-1.54-.468-2.14-1.404-2.14-1.404s.134.066.335.2h.06c.03 0 .044.015.06.03v.006c.016.016.03.03.06.03.33.136.66.27.93.4.466.202 1.065.403 1.8.536.93.135 1.996.2 3.21 0 .6-.135 1.2-.267 1.8-.535.39-.2.87-.4 1.397-.737 0 0-.6.936-2.205 1.404.33.466.795 1 .795 1 2.744-.06 3.81-1.8 3.87-1.726 0-3.87-1.815-7.02-1.815-7.02-1.635-1.214-3.165-1.26-3.435-1.26l.056-.02zm.168 4.413c.703 0 1.27.6 1.27 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334.002-.74.573-1.338 1.27-1.338zm-4.543 0c.7 0 1.266.6 1.266 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334 0-.74.57-1.338 1.27-1.338z"
          />
        </svg>
        <span>{{ $t("setup.channels") }}</span>
      </div>
      <span>{{ $t("setup.go") }} &RightArrow;</span>
    </a>

    <a
      class="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-red-100 bg-red-500 rounded-lg shadow-md focus:outline-none focus:shadow-outline-red"
      :href="`https://discord.com/channels/${currentGuildId || ''}`"
      target="_blank"
    >
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M20.222 0c1.406 0 2.54 1.137 2.607 2.475V24l-2.677-2.273-1.47-1.338-1.604-1.398.67 2.205H3.71c-1.402 0-2.54-1.065-2.54-2.476V2.48C1.17 1.142 2.31.003 3.715.003h16.5L20.222 0zm-6.118 5.683h-.03l-.202.2c2.073.6 3.076 1.537 3.076 1.537-1.336-.668-2.54-1.002-3.744-1.137-.87-.135-1.74-.064-2.475 0h-.2c-.47 0-1.47.2-2.81.735-.467.203-.735.336-.735.336s1.002-1.002 3.21-1.537l-.135-.135s-1.672-.064-3.477 1.27c0 0-1.805 3.144-1.805 7.02 0 0 1 1.74 3.743 1.806 0 0 .4-.533.805-1.002-1.54-.468-2.14-1.404-2.14-1.404s.134.066.335.2h.06c.03 0 .044.015.06.03v.006c.016.016.03.03.06.03.33.136.66.27.93.4.466.202 1.065.403 1.8.536.93.135 1.996.2 3.21 0 .6-.135 1.2-.267 1.8-.535.39-.2.87-.4 1.397-.737 0 0-.6.936-2.205 1.404.33.466.795 1 .795 1 2.744-.06 3.81-1.8 3.87-1.726 0-3.87-1.815-7.02-1.815-7.02-1.635-1.214-3.165-1.26-3.435-1.26l.056-.02zm.168 4.413c.703 0 1.27.6 1.27 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334.002-.74.573-1.338 1.27-1.338zm-4.543 0c.7 0 1.266.6 1.266 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334 0-.74.57-1.338 1.27-1.338z"
          />
        </svg>
        <span>{{ $t("setup.roles") }}</span>
      </div>
      <span>{{ $t("setup.go") }} &RightArrow;</span>
    </a>

    <a
      class="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-red-100 bg-red-500 rounded-lg shadow-md focus:outline-none focus:shadow-outline-red"
      href="https://support.discord.com/hc/en-us/articles/206143877-How-do-I-set-up-a-Role-Exclusive-channel-"
      target="_blank"
    >
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M20.222 0c1.406 0 2.54 1.137 2.607 2.475V24l-2.677-2.273-1.47-1.338-1.604-1.398.67 2.205H3.71c-1.402 0-2.54-1.065-2.54-2.476V2.48C1.17 1.142 2.31.003 3.715.003h16.5L20.222 0zm-6.118 5.683h-.03l-.202.2c2.073.6 3.076 1.537 3.076 1.537-1.336-.668-2.54-1.002-3.744-1.137-.87-.135-1.74-.064-2.475 0h-.2c-.47 0-1.47.2-2.81.735-.467.203-.735.336-.735.336s1.002-1.002 3.21-1.537l-.135-.135s-1.672-.064-3.477 1.27c0 0-1.805 3.144-1.805 7.02 0 0 1 1.74 3.743 1.806 0 0 .4-.533.805-1.002-1.54-.468-2.14-1.404-2.14-1.404s.134.066.335.2h.06c.03 0 .044.015.06.03v.006c.016.016.03.03.06.03.33.136.66.27.93.4.466.202 1.065.403 1.8.536.93.135 1.996.2 3.21 0 .6-.135 1.2-.267 1.8-.535.39-.2.87-.4 1.397-.737 0 0-.6.936-2.205 1.404.33.466.795 1 .795 1 2.744-.06 3.81-1.8 3.87-1.726 0-3.87-1.815-7.02-1.815-7.02-1.635-1.214-3.165-1.26-3.435-1.26l.056-.02zm.168 4.413c.703 0 1.27.6 1.27 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334.002-.74.573-1.338 1.27-1.338zm-4.543 0c.7 0 1.266.6 1.266 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334 0-.74.57-1.338 1.27-1.338z"
          />
        </svg>
        <span>Learn more about channel setup</span>
      </div>
      <span>{{ $t("setup.go") }} &RightArrow;</span>
    </a>

    <div class="hidden sm:flex flex-wrap -mx-3">
      <div class="w-full xl:w-1/2 px-3">
        <div
          class="w-full bg-white rounded-lg shadow-md dark:bg-gray-800 p-4 mb-8 xl:mb-0"
        >
          <p class="text-xl mb-4">{{ $t("setup.channelMappings") }}</p>
          <table class="w-full whitespace-no-wrap">
            <thead>
              <tr
                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
              >
                <th class="px-4 py-3">{{ $t("setup.coin") }}</th>
                <th class="px-4 py-3">{{ $t("setup.amount") }}</th>
                <th class="px-4 py-3">{{ $t("setup.channel") }}</th>
                <th class="px-4 py-3">{{ $t("setup.actions") }}</th>
              </tr>
            </thead>
            <tbody
              class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
            >
              <template v-if="channelMappings.length">
                <tr
                  v-for="(channelMap, index) in channelMappings"
                  :key="index"
                  class="text-gray-700 dark:text-gray-400"
                >
                  <td class="px-4 py-3">{{ channelMap.coinKind }}</td>
                  <td class="px-4 py-3">{{ channelMap.requiredBalance }}</td>
                  <td class="px-4 py-3">{{ channelMap.channel }}</td>
                  <td class="px-4 py-3">
                    <div class="flex items-center space-x-4 text-sm">
                      <!--<button
                      @click="addChannelMapping"
                      class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-blue-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                      aria-label="Edit"
                    >
                      <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                        ></path>
                      </svg>
                    </button>-->
                      <button
                        @click="removeChannelMapping(index)"
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Delete"
                      >
                        <svg
                          class="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </template>
              <tr>
                <td class="px-3 py-3">
                  <label class="block w-full text-sm">
                    <select
                      class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
                      placeholder="COIN"
                      v-model="channelMapping.coinKind"
                    >
                      <template v-if="coins.length">
                        <option
                          v-for="coin in coins"
                          :key="coin.rnbUserId"
                          :value="coin.coinSymbol"
                        >
                          {{ coin.coinSymbol }}
                        </option>
                      </template>
                      <option v-else>{{ $t("dashboard.loading") }}...</option>
                    </select>
                  </label>
                </td>
                <td class="px-3 py-3">
                  <label class="block w-full text-sm">
                    <input
                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="100"
                      type="number"
                      v-model="channelMapping.requiredBalance"
                    />
                  </label>
                </td>
                <td class="px-3 py-3">
                  <label class="block w-full text-sm">
                    <input
                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="Channel1"
                      v-model="channelMapping.channel"
                    />
                  </label>
                </td>
                <td class="px-4 py-3">
                  <button
                    @click="addChannelMapping"
                    type="button"
                    class="w-full inline-flex justify-center rounded-md border border-gray-500 shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
                  >
                    {{ $t("setup.add") }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="w-full xl:w-1/2 px-3">
        <div
          class="w-full bg-white rounded-lg shadow-md dark:bg-gray-800 p-4 mb-8 xl:mb-0"
        >
          <p class="text-xl mb-4">{{ $t("setup.roleMappings") }}</p>
          <table class="w-full whitespace-no-wrap">
            <thead>
              <tr
                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
              >
                <th class="px-4 py-3">{{ $t("setup.coin") }}</th>
                <th class="px-4 py-3">{{ $t("setup.amount") }}</th>
                <th class="px-4 py-3">{{ $t("setup.role") }}</th>
                <th class="px-4 py-3">{{ $t("setup.actions") }}</th>
              </tr>
            </thead>
            <tbody
              class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
            >
              <template v-if="roleMappings.length">
                <tr
                  v-for="(roleMap, index) in roleMappings"
                  :key="index"
                  class="text-gray-700 dark:text-gray-400"
                >
                  <td class="px-4 py-3">{{ roleMap.coinKind }}</td>
                  <td class="px-4 py-3">{{ roleMap.requiredBalance }}</td>
                  <td class="px-4 py-3">{{ roleMap.roleName }}</td>
                  <td class="px-4 py-3">
                    <div class="flex items-center space-x-4 text-sm">
                      <!--<button
                      @click="addRoleMapping"
                      class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-blue-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                      aria-label="Edit"
                    >
                      <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                        ></path>
                      </svg>
                    </button>-->
                      <button
                        @click="removeRoleMapping(index)"
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Delete"
                      >
                        <svg
                          class="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </template>
              <tr>
                <td class="px-3 py-3">
                  <label class="block w-full text-sm">
                    <select
                      class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
                      placeholder="COIN"
                      v-model="roleMapping.coinKind"
                    >
                      <template v-if="coins.length">
                        <option
                          v-for="coin in coins"
                          :key="coin.rnbUserId"
                          :value="coin.coinSymbol"
                        >
                          {{ coin.coinSymbol }}
                        </option>
                      </template>
                      <option v-else>{{ $t("dashboard.loading") }}...</option>
                    </select>
                  </label>
                </td>
                <td class="px-3 py-3">
                  <label class="block w-full text-sm">
                    <input
                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="100"
                      type="number"
                      v-model="roleMapping.requiredBalance"
                    />
                  </label>
                </td>
                <td class="px-3 py-3">
                  <label class="block w-full text-sm">
                    <input
                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="Role1"
                      v-model="roleMapping.roleName"
                    />
                  </label>
                </td>
                <td class="px-4 py-3">
                  <button
                    @click="addRoleMapping"
                    type="button"
                    class="w-full inline-flex justify-center rounded-md border border-gray-500 shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
                  >
                    {{ $t("setup.add") }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Breadcrumbs from "@/components/Breadcrumbs";
import Modal from "@/components/Modal";

import config from "@/config";
import fetch from "@/utils/fetch";
import queryString from "@/utils/queryString";

export default {
  name: "Setup",
  components: {
    Breadcrumbs,
    Modal,
  },
  computed: {
    ...mapState(["currentGuildId", "token", "coins"]),
    ...mapGetters({ auth: "ifAuthenticated" }),
  },
  data() {
    return {
      channelMappingsIdx: null,
      channelMappings: [],
      roleMappingsIdx: null,
      roleMappings: [],
      roleMapping: { coinKind: "", requiredBalance: "", roleName: "" },
      channelMapping: { coinKind: "", requiredBalance: "", channel: "" },
      modalVisible: false,
      modalType: "warning",
      modalTitle: "Warning",
      modalContent: "",
      id: 0,
    };
  },
  methods: {
    //for add and edit
    addChannelMapping() {
      this.modalType = "info";
      this.modalVisible = true;
      this.modalTitle = "Info";
      this.modalContent = "You are about to add a new channel mapping";
      this.id = 0;
      //set channel mapping endpoint
    },
    addRoleMapping() {
      this.modalType = "info";
      this.modalVisible = true;
      this.modalTitle = "Info";
      this.modalContent = "You are about to add a new role mapping";
      this.id = 2;
      //set role mapping endpoint
    },
    //for delete
    removeChannelMapping(idx) {
      this.modalType = "warning";
      this.modalVisible = true;
      this.modalTitle = "Warning";
      this.modalContent = "You are about to delete a channel mapping";
      this.channelMappingsIdx = idx;
      this.id = 1;
      //remove channel mapping endpoint
    },
    removeRoleMapping(idx) {
      this.modalType = "warning";
      this.modalVisible = true;
      this.modalTitle = "Warning";
      this.modalContent = "You are about to delete a role mapping";
      this.roleMappingsIdx = idx;
      this.id = 3;
      //remove role mapping endpoint
    },
    validate(id) {
      if (id === 0) {
        const { coinKind, requiredBalance, channel } = this.channelMapping;
        return coinKind && requiredBalance && channel;
      } else if (id === 2) {
        const { coinKind, requiredBalance, roleName } = this.roleMapping;
        return coinKind && requiredBalance && roleName;
      } else {
        return true;
      }
    },
    clear(id) {
      if (id === 0) {
        this.channelMapping = {
          coinKind: "",
          requiredBalance: "",
          channel: "",
        };
      } else if (id === 2) {
        this.roleMapping = { coinKind: "", requiredBalance: "", roleName: "" };
      }
    },
    //send a request
    confirm(id) {
      if (!this.currentGuildId || !this.auth) {
        this.$toast.info("No guild has been selected");
        this.modalVisible = false;
        return;
      }

      this.modalVisible = false;
      let endpoint, message, body, method;
      switch (id) {
        case 0:
          message = "Creating new channel mapping";
          endpoint = `/mappings/channels${queryString({
            guildId: this.currentGuildId,
          })}`;
          body = JSON.stringify(this.channelMapping);
          method = "POST";
          break;
        case 1:
          message = "Deleting channel mapping";
          endpoint = `/mappings/channels${queryString({
            guildId: this.currentGuildId,
          })}`;
          body = JSON.stringify(this.channelMappings[this.channelMappingsIdx]);
          method = "DELETE";
          break;
        case 2:
          message = "Creating new role mapping";
          endpoint = `/mappings/roles${queryString({
            guildId: this.currentGuildId,
          })}`;
          body = JSON.stringify(this.roleMapping);
          method = "POST";
          break;
        case 3:
          message = "Deleting role mapping";
          endpoint = `/mappings/roles${queryString({
            guildId: this.currentGuildId,
          })}`;
          body = JSON.stringify(this.roleMappings[this.roleMappingsIdx]);
          method = "DELETE";
          break;
        default:
          break;
      }

      if (!this.validate(id)) {
        this.$toast.info("Some important fields are missing");
        return;
      }

      fetch(`${config.botApi}${endpoint}`, {
        method,
        headers: {
          authorization: this.token,
        },
        body,
      })
        .then((res) => res.json())
        .then((response) => {
          this.$toast.info(message);
          if (!response.length) {
            if (id >= 2) this.roleMappings = [];
            else this.channelMappings = [];
            return;
          }
          if (id >= 2) this.roleMappings = response[0].coinKind ? response : [];
          else this.channelMappings = response[0].coinKind ? response : [];
        })
        .catch(() =>
          this.$toast.warning("Failed to complete action. Are you offline?")
        );

      this.clear(id);
    },
    refresh(val) {
      if (!this.auth) return;

      this.$toast.info("Refreshing...");

      fetch(`${config.botApi}/mappings/channels/${val}`, {
        headers: {
          authorization: this.token,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          if (!response.length) return;
          this.channelMappings = response[0].coinKind ? response : [];
        })
        .catch(() =>
          this.$toast.warning("Failed to get data channel. Are you offline?")
        );

      fetch(`${config.botApi}/mappings/roles/${val}`, {
        headers: {
          authorization: this.token,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          if (!response.length) return;
          this.roleMappings = response[0].coinKind ? response : [];
        })
        .catch(() =>
          this.$toast.warning("Failed to get role mappings. Are you offline?")
        );
    },
  },
  watch: {
    currentGuildId(val) {
      this.refresh(val);
    },
  },
  mounted() {
    this.currentGuildId && this.refresh(this.currentGuildId);
  },
};
</script>