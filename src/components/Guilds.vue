<template>
  <div
    class="w-12 shadow-lg flex flex-col items-center justify-start h-screen bg-gray-100 dark:bg-gray-700 z-40"
    id="channels-nav"
  >
    <img
      src="../assets/avatar.png"
      class="w-10 h-10 bg-gray-300 dark:bg-gray-800 rounded-full shadow-lg mt-3"
    />
    <div class="w-10 h-1 bg-gray-300 dark:bg-gray-800 mt-3"></div>
    <img
      src="@/assets/PlatformProIcon.png"
      class="w-10 h-10 cursor-pointer bg-gray-300 dark:bg-gray-800 rounded-full shadow-lg mt-3"
    />
    <svg
      class="w-10 h-10 cursor-pointer bg-gray-300 dark:bg-gray-800 rounded-full shadow-lg mt-3"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: "Guilds",
};
</script>