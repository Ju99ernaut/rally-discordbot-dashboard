<template>
  <div
    :class="show ? '' : 'opacity-0 pointer-events-none'"
    class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center"
  >
    <div
      class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
    ></div>

    <div
      class="modal-container w-11/12 md:max-w-md mx-auto z-50 overflow-y-auto"
    >
      <div
        class="modal-close esc-close absolute top-12 right-0.5 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
      >
        <svg
          class="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          @click="closeModal"
        >
          <path
            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
          ></path>
        </svg>
      </div>
      <slide-y-up-transition :duration="animationDuraion">
        <!-- component -->
        <div
          class="max-w-sm dark:bg-gray-800 bg-white shadow rounded-lg mx-auto text-center p-12"
        >
          <!-- Close -->
          <div
            class="modal-close dark:text-white text-black flex justify-end cursor-pointer z-50"
            :class="closeBtn ? '' : 'hidden'"
            @click="closeModal"
          >
            <svg
              class="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
              ></path>
            </svg>
          </div>
          <!-- Close end -->
          <!-- Icon -->
          <div
            v-if="mdlType === 'info' || !mdlType"
            class="text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500 mx-auto p-2 w-12 h-12 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              style="fill: currentColor"
            >
              <path
                d="M10 15.586L6.707 12.293 5.293 13.707 10 18.414 19.707 8.707 18.293 7.293z"
              ></path>
            </svg>
          </div>
          <div
            v-else
            class="text-red-500 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-500 mx-auto p-2 w-12 h-12 flex items-center justify-center"
          >
            <svg
              class="h-6 w-6"
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

          <!-- Content -->
          <slot name="mdlBody"></slot>
          <!-- End Content -->

          <!-- Buttons -->
          <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <slot name="actionBtn"></slot>
            <!-- e.g <button
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                  Deactivate
                  </button>-->
            <button
              type="button"
              name="cancel"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              :class="closeBtn ? '' : 'hidden'"
              @click="closeModal"
            >
              Cancel
            </button>
          </div>
          <!-- Buttons Link -->
        </div>
      </slide-y-up-transition>
    </div>
  </div>
</template>

<style scoped>
.esc-close {
  top: 3rem;
  right: 0.1rem;
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
    closeModal() {
      this.$emit("update:show", false);
    },
  },
};
</script>