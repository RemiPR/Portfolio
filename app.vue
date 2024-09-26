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
import { SpeedInsights } from "@vercel/speed-insights/nuxt"

const { t, locale } = useI18n();

useHead({
  htmlAttrs: {
    lang: locale,
  },
  titleTemplate: "%s",
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "format-detection", content: "telephone=no" },
  ],
  link: [
    { rel: "preconnect", href: "https://rsms.me/" },
    { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    { rel: "manifest", href: "/site.webmanifest" },
  ],
});

useSeoMeta({
  title: t("meta.title"),
  description: t("meta.description"),
  ogTitle: t("meta.title"),
  ogDescription: t("meta.description"),
  ogImage: {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "Open Graph Image",
  },
  ogType: "website",
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
