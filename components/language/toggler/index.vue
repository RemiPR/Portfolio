<template>
  <div class="relative inline-block -ml-4" ref="togglerRef">
    <button
      @click="toggleDropdown"
      class="flex items-center justify-between w-40 px-4 py-2 font-medium text-slate-200 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-teal-500 transition duration-150 ease-in-out group"
    >
      <div class="flex items-center space-x-3">
        <span
          v-if="currentLanguage"
          class="w-5 h-5 flex items-center justify-center"
          v-html="getSvgFlag(currentLanguage.code)"
        ></span>
        <span>{{
          currentLanguage ? currentLanguage.name : "Select Language"
        }}</span>
      </div>
      <svg
        class="w-5 h-5 transition-transform duration-200 ease-in-out"
        :class="{
          '-rotate-180': isOpen,
          'group-hover:-rotate-90': !isOpen,
        }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <div
      v-if="isOpen"
      class="absolute left-full top-0 ml-2 py-1 w-40 bg-slate-800 rounded-md shadow-xl z-20"
    >
      <a
        v-for="lang in availableLocales"
        :key="lang.code"
        href="#"
        @click.prevent.stop="switchLanguage(lang.code)"
        class="flex items-center px-4 py-2 text-slate-200 hover:bg-slate-700 transition duration-150 ease-in-out"
      >
        <span
          class="w-5 h-5 mr-3 flex items-center justify-center"
          v-html="getSvgFlag(lang.code)"
        ></span>
        {{ lang.name }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";

const { locale, locales, setLocale } = useI18n();

const isOpen = ref(false);
const togglerRef = ref(null);
const isLanguageChanging = ref(false);

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});

const currentLanguage = computed(() => {
  return locales.value.find((lang) => lang.code === locale.value);
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
const emit = defineEmits(["languageChanging"]);

const switchLanguage = async (lang) => {
  emit("languageChanging", true);
  await setLocale(lang);
  setTimeout(() => {
    emit("languageChanging", false);
  }, 500); // Adjust this delay as needed
  500;
};
const getSvgFlag = (code) => {
  switch (code) {
    case "en":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30">
                <clipPath id="a"><path d="M0 0v30h60V0z"/></clipPath>
                <clipPath id="b"><path d="M30 15h30v15zv15H0zH0V0zV0h30z"/></clipPath>
                <g clip-path="url(#a)">
                  <path d="M0 0v30h60V0z" fill="#012169"/>
                  <path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"/>
                  <path d="M0 0l60 30m0-30L0 30" clip-path="url(#b)" stroke="#C8102E" stroke-width="4"/>
                  <path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/>
                  <path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/>
                </g>
              </svg>`;
    case "lt":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
                <rect width="200" height="100" fill="#FDB913"/>
                <rect width="200" height="66.67" y="33.33" fill="#006A44"/>
                <rect width="200" height="33.33" y="66.67" fill="#C1272D"/>
              </svg>`;
    case "ja":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
                <rect width="900" height="600" fill="#fff"/>
                <circle cx="450" cy="300" r="180" fill="#bc002d"/>
              </svg>`;
    default:
      return "";
  }
};

// Click-outside functionality
const handleClickOutside = (event) => {
  if (togglerRef.value && !togglerRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 1s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
