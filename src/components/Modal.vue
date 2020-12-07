<template>
  <SlideYUpTransition :duration="animationDuraion">
    <!-- component -->
    <div class="max-w-sm bg-white shadow rounded-lg mx-auto text-center p-12">
      <!-- Icon -->
      <div
        v-if="mdlType === 'info' || !mdlType"
        class="bg-green-100 rounded-full mx-auto p-2 w-12 h-12 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          style="fill: rgba(4, 122, 85, 1); transform: ; -ms-filter: "
        >
          <path
            d="M10 15.586L6.707 12.293 5.293 13.707 10 18.414 19.707 8.707 18.293 7.293z"
          ></path>
        </svg>
      </div>
      <div
        v-else
        class="bg-red-100 rounded-full mx-auto p-2 w-12 h-12 flex items-center justify-center"
      >
        <svg
          class="h-6 w-6 text-red-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <!-- End Icon -->

      <!-- Title -->
      <h4 class="text-xl font-semibold mt-5">{{ mdlTitle }}</h4>
      <!-- End Title -->

      <!-- Text -->
      <p class="text-base text-gray-500 mt-2 mb-5">
        {{ mdlContent }}
      </p>
      <!-- End Text -->

      <!-- Buttons -->
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <slot name="actionBtn"></slot>
        <!-- e.g <button
          type="button"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Deactivate
        </button>-->
        <button
          type="button"
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          :class="closeBtn ? '' : 'hidden'"
        >
          Cancel
        </button>
      </div>
      <!-- Buttons Link -->
    </div>
  </SlideYUpTransition>
</template>

<style scoped>
.modal.show {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>

<script>
import { SlideYUpTransition } from "vue2-transitions";

export default {
  name: "Modal",
  components: {
    SlideYUpTransition,
  },
  props: {
    show: Boolean,
    closeBtn: Boolean,
    mdlTitle: String,
    mdlContent: String,
    mdlType: {
      type: String,
      default: "info",
      validator(value) {
        const acceptedValues = ["info", "warning", "error"];
        return acceptedValues.indexOf(value) !== -1;
      },
      description: "Modal type (info|warning|error)",
    },
    animationDuraion: {
      type: Number,
      default: 500,
      description: "Transition duration",
    },
  },
  methods: {
    closeModal() {},
  },
  watch: {
    show(val) {
      let documentClasses = document.body.classList;
      if (val) documentClasses.add("modal-open");
      else documentClasses.remove("modal-open");
    },
  },
};
</script>