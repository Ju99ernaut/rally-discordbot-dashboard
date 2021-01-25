<template>
  <div id="feature-request">
    <breadcrumbs :name="$t('sidebar.featureRequest')" />

    <a
      class="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-red-100 bg-red-500 rounded-lg shadow-md focus:outline-none focus:shadow-outline-red"
      :href="issues"
      target="_blank"
    >
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          />
        </svg>
        <span>{{ $t("featureRequest.onGithub") }}</span>
      </div>
      <span>{{ $t("setup.go") }} &RightArrow;</span>
    </a>

    <div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <p class="text-xl mb-4">{{ $t("sidebar.featureRequest") }}</p>
      <label class="block text-sm">
        <span class="text-gray-700 dark:text-gray-400">{{
          $t("featureRequest.title")
        }}</span>
        <input
          class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
          :placeholder="$t('featureRequest.title')"
          v-model="title"
        />
      </label>
      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">{{
          $t("featureRequest.description")
        }}</span>
        <textarea
          class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
          rows="3"
          :placeholder="$t('featureRequest.descPlaceholder')"
          v-model="description"
        ></textarea>
      </label>
      <button
        name="submit"
        @click="submitRequest"
        type="button"
        class="mt-4 bg-red-500 hover:bg-red-600 focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow"
      >
        {{ $t("featureRequest.submit") }}
      </button>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from "@/components/Breadcrumbs";
import config from "@/config";
import fetch from "@/utils/fetch";
import queryString from "@/utils/queryString";

export default {
  name: "FeatureRequest",
  components: {
    Breadcrumbs,
  },
  data() {
    return {
      title: "",
      description: "",
      issues: `${config.githubHome}/issues`,
    };
  },
  methods: {
    submitRequest() {
      const obj = {
        "entry.400743370": this.title,
        "entry.291791210": this.description,
      };
      fetch(
        "https://docs.google.com/forms/d/e/" +
          "1FAIpQLSewYQ-mTzq3lr9Cw6cxCARUvnu_24QCvpWkfWKOdP79FhjKpQ/formResponse" +
          queryString(obj),
        {
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
        .then(() => this.$toast.success("Feature request recorded"))
        .catch(() =>
          this.$toast.warning(
            "Failed to send feature request. Are you offline?"
          )
        );
      this.title = "";
      this.description = "";
    },
  },
};
</script>