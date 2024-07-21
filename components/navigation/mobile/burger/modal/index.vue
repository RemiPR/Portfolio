<!-- components/navigation/mobile/burger/modal/index.vue -->
<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 backdrop-blur-md bg-slate-900/80 z-50 overflow-y-auto"
    >
      <div class="flex flex-col min-h-screen">
        <div class="sticky top-0 z-10 bg-slate-900/70 p-4">
          <div class="flex justify-between items-center">
            <LanguageToggler
              @language-changing="$emit('language-changing', $event)"
            />
            <button
              @click="$emit('close')"
              class="text-slate-200 hover:text-teal-300 p-2 rounded-full bg-slate-800"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="flex-grow flex flex-col justify-between p-6">
          <div class="w-full max-w-sm mx-auto mb-8">
            <ContactSocialMobile />
          </div>
          <ContactForm :initially-open="true" class="w-full max-w-sm mx-auto" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean,
  navItems: Array,
  socialItems: Array,
});

const emit = defineEmits(["close", "language-changing"]);

const lockScroll = () => {
  document.body.style.overflow = "hidden";
};

const unlockScroll = () => {
  document.body.style.overflow = "";
};

onMounted(() => {
  if (props.isOpen) {
    lockScroll();
  }
});

onUnmounted(() => {
  unlockScroll();
});

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
