<template>
  <div class="flex flex-row m-0 ml-2 text-xs font-bold">
    <img
      v-if="icon"
      class="w-8 h-8 ml-7 object-contain"
      :src="icon"
      alt="coin-icon"
    />
    <img
      v-else
      class="w-8 h-8 ml-7 object-contain"
      src="@/assets/RLY.svg"
      alt="coin-icon"
    />
    <div class="flex flex-col">
      <p class="m-0 -mt-1 ml-2 text-xs font-light">
        <span class="m-0 text-xs font-bold">{{ coin }}</span>
      </p>
      <div class="flex flex-row -mt-2">
        <p
          class="m-0 text-lg ml-2 font-medium"
          :class="percentage ? '' : 'text-green-500'"
        >
          {{ price }}
        </p>
        <svg
          class="w-6 h-6 inline-block text-2xl flex-shrink-0 select-none"
          :class="
            increase ? 'transform rotate-180 text-green-500' : 'text-red-500'
          "
          fill="currentColor"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M7 10l5 5 5-5z"></path>
        </svg>
        <p
          class="m-0 text-sm font-normal"
          :class="increase ? 'text-green-500' : 'text-red-500'"
        >
          {{ percentage }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "price-ticker",
  props: {
    coin: {
      type: String,
      default: "$RLY",
      description: "Creator coin symbol or token symbol",
    },
    icon: {
      type: String,
      default: "",
      description: "Path to coin icon",
    },
    price: {
      type: String,
      default: "$0",
    },
    increase: {
      type: Boolean,
      default: true,
      description: "Price increase or decrease",
    },
    percentage: {
      type: String,
      default: "",
      description: "% increase/decrease",
    },
  },
};
</script>