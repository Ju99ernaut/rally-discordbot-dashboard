<template>
  <ul
    class="absolute right-0 w-56 p-2 mt-1 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700"
  >
    <li class="flex">
      <a
        class="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        href="#"
      >
        <span>Messages</span>
        <span
          class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-600"
        >
          13
        </span>
      </a>
    </li>
    <li class="flex">
      <a
        class="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        href="#"
      >
        <span>Sales</span>
        <span
          class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-600"
        >
          2
        </span>
      </a>
    </li>
    <li class="flex">
      <a
        class="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        href="#"
      >
        <span>Alerts</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "notifications",
};
</script>