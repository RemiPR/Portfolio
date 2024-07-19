<!-- components/Modal.vue -->
<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="fixed inset-0 z-50 overflow-hidden"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      @click="closeModal"
    >
      <div
        class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <div
          class="inline-block align-bottom bg-slate-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
          @click.stop
        >
          <div class="bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3
                  class="text-2xl leading-6 font-bold text-slate-200 mb-2"
                  id="modal-title"
                >
                  {{ title }}
                </h3>
                <p class="text-sm text-slate-400 mb-4">{{ subtitle }}</p>

                <div v-if="imageArray.length > 0" class="mb-4 relative">
                  <img
                    :src="imageArray[currentImageIndex]"
                    :alt="title"
                    class="w-full h-64 object-cover rounded-lg"
                  />
                  <div
                    v-if="imageArray.length > 0"
                    class="absolute top-1/2 transform -translate-y-1/2 left-2"
                  >
                    <button
                      @click="prevImage"
                      class="bg-slate-800 bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    v-if="imageArray.length > 0"
                    class="absolute top-1/2 transform -translate-y-1/2 right-2"
                  >
                    <button
                      @click="nextImage"
                      class="bg-slate-800 bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    v-if="imageArray.length > 0"
                    class="absolute bottom-2 left-1/2 transform -translate-x-1/2"
                  >
                    <div class="flex space-x-2">
                      <div
                        v-for="(_, index) in imageArray"
                        :key="index"
                        :class="[
                          'w-2 h-2 rounded-full',
                          index === currentImageIndex
                            ? 'bg-white'
                            : 'bg-slate-400',
                        ]"
                      ></div>
                    </div>
                  </div>
                </div>

                <h4 class="text-lg font-semibold text-slate-200 mb-2">
                  {{ $t("modal.about") }}
                </h4>

                <div
                  class="text-slate-300 mb-4 leading-relaxed max-h-80 overflow-y-auto pr-2"
                  ref="aboutSection"
                  v-html="processedDetailedDescription"
                ></div>

                <div v-if="technologies" class="mb-4">
                  <h4 class="text-lg font-semibold text-slate-200 mb-2">
                    {{ $t("modal.technologies") }}
                  </h4>
                  <ul class="flex flex-wrap">
                    <li
                      v-for="tech in technologies"
                      :key="tech"
                      class="mr-2 mb-2"
                    >
                      <span
                        class="inline-block bg-teal-400/10 rounded-full px-3 py-1 text-sm font-semibold text-teal-300"
                      >
                        {{ tech }}
                      </span>
                    </li>
                  </ul>
                </div>

                <!-- Website and GitHub links -->
                <div class="flex flex-col space-y-4 mt-6 -mx-4">
                  <a
                    v-if="websiteUrl"
                    :href="websiteUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group p-4 rounded-lg transition-all duration-300 hover:bg-slate-700/50"
                  >
                    <div class="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 mr-2 text-teal-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                      <span class="text-lg font-semibold text-slate-200">
                        {{ $t("modal.website") }}</span
                      >
                    </div>
                    <div class="mt-1 flex items-center">
                      <span class="text-sm text-slate-400">{{
                        websiteUrl
                      }}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 ml-2 text-teal-300 opacity-0 transform transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </a>

                  <a
                    v-if="githubUrl"
                    :href="githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group p-4 rounded-lg transition-all duration-300 hover:bg-slate-700/50"
                  >
                    <div class="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 mr-2 text-teal-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                        />
                      </svg>
                      <span class="text-lg font-semibold text-slate-200"
                        >GitHub</span
                      >
                    </div>
                    <div class="mt-1 flex items-center">
                      <span class="text-sm text-slate-400">{{
                        githubUrl
                      }}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 ml-2 text-teal-300 opacity-0 transform transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <!-- Close modal button -->
          <div
            class="bg-slate-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
          >
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
              @click="closeModal"
            >
              {{ $t("modal.close") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useTextDivider } from "@/composables/useTextDivider.js";

const props = defineProps({
  show: Boolean,
  title: String,
  subtitle: String,
  detailedDescription: String,
  image: {
    type: [String, Array],
    default: null,
  },
  technologies: Array,
  websiteUrl: String,
  githubUrl: String,
});

const { processText } = useTextDivider();

const processedDetailedDescription = computed(() => {
  return processText(props.detailedDescription);
});

const emit = defineEmits(["close"]);

const aboutSection = ref(null);
const currentImageIndex = ref(0);

const imageArray = computed(() => {
  if (Array.isArray(props.image)) {
    return props.image;
  } else if (typeof props.image === "string") {
    return [props.image];
  }
  return [];
});

const disableBodyScroll = () => {
  if (process.client) {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
};

const enableBodyScroll = () => {
  if (process.client) {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }
};

const closeModal = () => {
  emit("close");
};

const nextImage = () => {
  currentImageIndex.value =
    (currentImageIndex.value + 1) % imageArray.value.length;
};

const prevImage = () => {
  currentImageIndex.value =
    (currentImageIndex.value - 1 + imageArray.value.length) %
    imageArray.value.length;
};

watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      disableBodyScroll();
      document.body.classList.add("modal-open");
    } else {
      enableBodyScroll();
      document.body.classList.remove("modal-open");
    }
  }
);

onMounted(() => {
  if (props.show) {
    disableBodyScroll();
    document.body.classList.add("modal-open");
  }
});

onUnmounted(() => {
  enableBodyScroll();
  document.body.classList.remove("modal-open");
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* Custom scrollbar styles */
.max-h-80 {
  scrollbar-width: thin;
  scrollbar-color: rgba(94, 234, 212, 0.3) rgba(30, 41, 59, 0.5);
}

.max-h-80::-webkit-scrollbar {
  width: 8px;
}

.max-h-80::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.5);
  border-radius: 4px;
}

.max-h-80::-webkit-scrollbar-thumb {
  background-color: rgba(94, 234, 212, 0.3);
  border-radius: 4px;
  border: 2px solid rgba(30, 41, 59, 0.5);
}

.max-h-80::-webkit-scrollbar-thumb:hover {
  background-color: rgba(94, 234, 212, 0.5);
}

.h-64 {
  height: 16rem;
}

.object-cover {
  object-fit: cover;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}
.text-slate-300 {
  white-space: pre-wrap;
}
.modal-open {
  overflow: hidden !important;
}
</style>
