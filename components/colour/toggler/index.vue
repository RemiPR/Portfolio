<!-- components/ColorToggler.vue -->
<template>
  <div class="relative" ref="togglerRef">
    <button
      @click="toggleDropdown"
      class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-slate-200 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-teal-500 transition duration-150 ease-in-out"
    >
      <div class="flex items-center space-x-3">
        <span class="w-5 h-5 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
        </span>
        <span>{{ $t("theme") }}</span>
      </div>
      <svg
        class="w-5 h-5 transition-transform duration-200 ease-in-out"
        :class="{
          'rotate-180': isOpen,
          'group-hover:rotate-[-90deg]': !isOpen,
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
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute left-full ml-2 mt-2 py-2 w-56 bg-slate-800 rounded-md shadow-xl z-20"
      >
        <a
          v-for="theme in themes"
          :key="theme.name"
          href="#"
          @click.prevent.stop="selectTheme(theme.name)"
          class="flex items-center px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 transition duration-150 ease-in-out"
        >
          <span
            class="w-5 h-5 mr-3 rounded-full"
            :style="{ backgroundColor: theme.color }"
          ></span>
          {{ theme.name }}
        </a>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isOpen = ref(false);
const togglerRef = ref(null);

const themes = [
  { name: "Light", color: "#ffffff" },
  { name: "Dark", color: "#1e293b" },
  { name: "System", color: "#64748b" },
];

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectTheme = (themeName) => {
  console.log(`Selected theme: ${themeName}`);
  isOpen.value = false;
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
