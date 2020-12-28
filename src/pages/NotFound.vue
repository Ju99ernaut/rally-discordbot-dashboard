<template>
  <div class="md:flex min-h-screen">
    <div
      class="w-full md:w-1/2 dark:bg-gray-900 bg-white flex items-center justify-center"
    >
      <div class="max-w-sm m-8">
        <div
          class="dark:text-gray-200 text-black text-5xl md:text-15xl font-black"
        >
          404
        </div>
        <div class="w-16 h-1 bg-red-500 my-3 md:my-6"></div>
        <p
          class="dark:text-gray-300 text-grey-darker text-2xl md:text-3xl font-light mb-8 leading-normal"
        >
          {{ $t("notFound.main") }}.
        </p>
        <router-link
          class="bg-transparent dark:text-gray-300 text-grey-darkest font-bold uppercase tracking-wide py-3 px-6 border-2 border-grey-light hover:border-grey rounded-lg"
          :to="{ path: '/' }"
          tag="button"
          name="to-home"
          >{{ $t("notFound.goHome") }}</router-link
        >
      </div>
    </div>
    <div
      class="relative pb-full md:flex p-8 md:pb-0 md:min-h-screen w-full md:w-1/2"
    >
      <img alt="illustration" src="@/assets/page_not_found_red.svg" />
    </div>
  </div>
</template>

<script>
export default {};
</script>