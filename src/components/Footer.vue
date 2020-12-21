<template>
  <div
    class="w-full shadow-lg bg-gray-100 dark:bg-gray-800 px-8 py-6 lg:flex justify-between items-center"
  >
    <p class="mb-2 lg:mb-0">© Copyright 2020</p>

    <div class="flex">
      <!--<a href="#" class="mr-6 hover:text-gray-400">{{ $t("footer.terms") }}</a>
      <a href="#" class="mr-6 hover:text-gray-400">{{ $t("footer.policy") }}</a>
      <a href="#" class="hover:text-gray-400">{{ $t("footer.about") }}</a>-->
      <a href="#" class="hover:text-gray-400">{{ $t("footer.love") }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>