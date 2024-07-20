<!-- components/Modal.vue -->
<template>
  <div>
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
            class="inline-block align-bottom bg-slate-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full max-h-[90vh] overflow-y-auto"
            @click.stop
          >
            <div class="bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="flex justify-between items-start mb-4">
                <h3
                  class="text-2xl leading-6 font-bold text-slate-200"
                  id="modal-title"
                >
                  {{ title }}
                </h3>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="closeModal"
                >
                  {{ $t("modal.close") }}
                </button>
              </div>
              <p class="text-sm text-slate-400 mb-4">{{ subtitle }}</p>

              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <!-- Main Image -->
                  <div v-if="imageArray.length" class="mb-4 relative group">
                    <Transition name="fade" mode="out-in">
                      <img
                        :key="mainImage"
                        :src="mainImage"
                        alt="Main Image"
                        class="w-full h-96 object-contain rounded-lg cursor-pointer"
                        @click="openFullScreenImage(mainImage)"
                      />
                    </Transition>
                    <div
                      class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-12 w-12 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>

                  <!-- Thumbnail Images -->
                  <div
                    v-if="imageArray.length > 1"
                    class="flex space-x-2 mb-4 overflow-x-auto"
                  >
                    <div
                      v-for="(image, index) in imageArray"
                      :key="index"
                      @click="setMainImage(image)"
                      class="relative cursor-pointer transition-all duration-300 hover:opacity-80 flex-shrink-0"
                    >
                      <img
                        :src="image"
                        :alt="`Thumbnail ${index + 1}`"
                        class="w-20 h-20 object-cover rounded"
                      />
                      <div
                        v-if="image === mainImage"
                        class="absolute inset-0 bg-teal-500 bg-opacity-40 rounded"
                      ></div>
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
          </div>
        </div>
      </div>
    </Transition>

    <!-- Full-screen image modal -->
    <Transition name="fade">
      <div
        v-if="fullScreenImage"
        class="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black bg-opacity-90 p-4"
        @click="closeFullScreenImage"
      >
        <div
          class="relative w-full h-[80vh] mb-4 flex items-center justify-center"
        >
          <Transition name="fade" mode="out-in">
            <img
              :key="fullScreenImage"
              :src="fullScreenImage"
              alt="Full-screen Image"
              class="max-w-full max-h-full w-auto h-auto object-contain cursor-pointer"
              @click.stop
            />
          </Transition>
          <button
            @click.stop="closeFullScreenImage"
            class="absolute -top-4 -right-4 text-white text-4xl hover:text-gray-300 focus:outline-none w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center border-2 border-white"
          >
            &times;
          </button>
        </div>

        <!-- Thumbnail row for full-screen view -->
        <div class="flex space-x-2 overflow-x-auto max-w-[90vw]">
          <div
            v-for="(image, index) in imageArray"
            :key="index"
            @click.stop="setFullScreenImage(image)"
            class="relative cursor-pointer transition-all duration-300 hover:opacity-80 flex-shrink-0"
          >
            <img
              :src="image"
              :alt="`Thumbnail ${index + 1}`"
              class="w-16 h-16 object-cover rounded"
            />
            <div
              v-if="image === fullScreenImage"
              class="absolute inset-0 bg-teal-500 bg-opacity-40 rounded"
            ></div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
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
  images: {
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
const fullScreenImage = ref(null);

const imageArray = computed(() => {
  if (Array.isArray(props.images)) {
    return props.images;
  } else if (typeof props.images === "string") {
    return [props.images];
  } else if (Array.isArray(props.image)) {
    return props.image;
  } else if (typeof props.image === "string") {
    return [props.image];
  }
  return [];
});

const mainImage = ref(imageArray.value[0] || "");

const setMainImage = (image) => {
  mainImage.value = image;
};

const setFullScreenImage = (image) => {
  fullScreenImage.value = image;
};

const openFullScreenImage = (image) => {
  fullScreenImage.value = image;
};

const closeFullScreenImage = () => {
  fullScreenImage.value = null;
};

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

watch(
  () => imageArray.value,
  (newImages) => {
    if (newImages && newImages.length) {
      mainImage.value = newImages[0];
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0.1;
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
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}
</style>
