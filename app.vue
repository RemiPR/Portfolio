<!-- app.vue-->
<template>
  <div>
    <Transition name="fade">
      <LoadingSpinner v-if="isLoading" />
    </Transition>
    <div
      :class="{
        'opacity-0': isLoading,
        'opacity-100': !isLoading,
      }"
    >
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

useSeoMeta({
  title: t("meta.title"),
  meta: [
    {
      name: "description",
      content: t("meta.description"),
    },
  ],
});

const isLoading = ref(true);

provide("isLoading", isLoading);

const { $fontLoadPromise } = useNuxtApp();

const waitForFontsAndMinTime = async () => {
  const minLoadTime = 1000; // 1 second minimum loading time
  const startTime = Date.now();

  await $fontLoadPromise;

  const elapsedTime = Date.now() - startTime;
  if (elapsedTime < minLoadTime) {
    await new Promise((resolve) =>
      setTimeout(resolve, minLoadTime - elapsedTime)
    );
  }
};

onMounted(async () => {
  try {
    await waitForFontsAndMinTime();
  } catch (error) {
    console.error("Error loading fonts:", error);
  } finally {
    isLoading.value = false;
  }
});

// Reset loading state when route changes
const route = useRoute();
watch(
  () => route.fullPath,
  async () => {
    isLoading.value = true;
    await waitForFontsAndMinTime();
    isLoading.value = false;
  }
);
</script>

<style>
html,
body {
  background-color: #0f172a; /* Tailwind's slate-900 */
}
.opacity-0 {
  opacity: 0;
}
.opacity-100 {
  opacity: 1;
}
body {
  transition: opacity 0.5s ease;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
