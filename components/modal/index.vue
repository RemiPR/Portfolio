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
          class="flex items-center justify-center min-h-screen sm:px-4 sm:pt-4 sm:pb-20 text-center sm:block sm:p-0"
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
            class="fixed inset-0 sm:static sm:inset-auto inline-block align-bottom bg-slate-800 sm:rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto"
            @click.stop
          >
            <div class="bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div
                class="flex flex-col items-center min-[425px]:flex-row min-[425px]:justify-between min-[425px]:items-start"
              >
                <div
                  class="order-2 min-[425px]:order-1 mt-3 min-[425px]:mt-0 text-center min-[425px]:text-left"
                >
                  <h3
                    class="text-2xl leading-6 font-bold text-slate-200"
                    id="modal-title"
                  >
                    {{ title }}
                  </h3>
                  <p class="text-sm text-slate-400 mt-2">{{ subtitle }}</p>
                </div>
                <button
                  type="button"
                  class="order-1 min-[425px]:order-2 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 min-[425px]:ml-3 min-[425px]:w-auto sm:text-sm select-none mb-3 min-[425px]:mb-0"
                  @click="closeModal"
                >
                  {{ $t("modal.close") }}
                </button>
              </div>

              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <!-- Main Image Swiper -->
                  <div v-if="imageArray.length" class="mb-4 relative group">
                    <Swiper
                      :modules="[SwiperNavigation]"
                      :slides-per-view="1"
                      :space-between="30"
                      :navigation="{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                      }"
                      :loop="true"
                      :speed="850"
                      @swiper="setMainSwiper"
                      @slideChange="handleMainSlideChange"
                      class="w-full h-96"
                    >
                      <SwiperSlide
                        v-for="(image, index) in imageArray"
                        :key="index"
                        class="flex items-center justify-center"
                      >
                        <NuxtImg
                          loading="lazy"
                          :src="image"
                          :alt="`Image ${index + 1}`"
                          class="w-full h-96 object-contain rounded-lg cursor-pointer select-none mt-4"
                          @click="openFullScreenImage(index)"
                        />
                      </SwiperSlide>
                      <div class="swiper-button-prev" @click.stop></div>
                      <div class="swiper-button-next" @click.stop></div>
                    </Swiper>

                    <div
                      class="z-50 absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-12 w-12 text-slate-300"
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

                  <!-- Image counter for main modal -->
                  <div class="flex justify-center my-4">
                    <div
                      v-if="imageArray.length > 1"
                      class="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm inline-block"
                    >
                      {{ currentMainIndex + 1 }} {{ $t("modal.imgCounter") }}
                      {{ imageArray.length }}
                    </div>
                  </div>

                  <!-- Thumbnail Images for main modal -->
                  <div
                    v-if="imageArray.length > 1"
                    class="flex justify-center space-x-2 mb-4 overflow-x-auto"
                  >
                    <div
                      v-for="(image, index) in imageArray"
                      :key="index"
                      @click="goToMainSlide(index)"
                      class="relative cursor-pointer transition-all duration-300 hover:opacity-80 flex-shrink-0"
                    >
                      <NuxtImg
                        loading="lazy"
                        :src="image"
                        :alt="`Thumbnail ${index + 1}`"
                        class="w-20 h-20 object-cover rounded select-none"
                      />
                      <div
                        v-if="index === currentMainIndex"
                        class="absolute inset-0 bg-teal-500 bg-opacity-40 rounded"
                      ></div>
                    </div>
                  </div>

                  <!-- Description -->
                  <h4 class="text-lg font-semibold text-slate-200 mb-2">
                    {{ $t("modal.about") }}
                  </h4>

                  <div
                    class="text-slate-300 mb-4 leading-relaxed max-h-80 overflow-y-auto pr-2"
                    ref="aboutSection"
                    v-html="processedDetailedDescription"
                  ></div>

                  <!-- Technologies -->
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
        class="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-slate-900 bg-opacity-95 p-4"
        @click="closeFullScreenImage"
        @keydown="handleKeyDown"
        tabindex="0"
        ref="fullScreenModal"
      >
        <div
          class="relative w-full h-[calc(100vh-240px)] flex items-center justify-center"
        >
          <Swiper
            :modules="[SwiperNavigation]"
            :slides-per-view="1"
            :space-between="30"
            :navigation="{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }"
            :loop="true"
            :speed="850"
            :initial-slide="currentFullScreenIndex"
            @swiper="setFullScreenSwiper"
            @slideChange="handleFullScreenSlideChange"
            class="w-full h-full"
          >
            <SwiperSlide
              v-for="(image, index) in imageArray"
              :key="index"
              class="flex items-center justify-center"
            >
              <div class="w-full h-full flex items-center justify-center">
                <NuxtImg
                  loading="lazy"
                  :src="image"
                  :alt="`Full-screen Image ${index + 1}`"
                  class="max-w-full max-h-full w-auto h-auto object-contain cursor-pointer select-none"
                  @click.stop="closeFullScreenImage"
                  @load="() => imageLoaded(index)"
                />
                <div
                  v-if="!imageLoadedIndex[index]"
                  class="absolute inset-0 flex items-center justify-center bg-slate-900 bg-opacity-50"
                >
                  <svg
                    class="animate-spin h-10 w-10 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div class="swiper-button-prev" @click.stop></div>
          <div class="swiper-button-next" @click.stop></div>
        </div>

        <!-- Image counter for full-screen modal -->
        <div
          v-if="fullScreenImage"
          class="mt-4 mb-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm"
        >
          {{ fullScreenSwiperInstance ? currentFullScreenIndex + 1 : 1 }}
          {{ $t("modal.imgCounter") }}
          {{ imageArray.length }}
        </div>

        <!-- Thumbnail row for full-screen view -->
        <div class="flex space-x-4 mt-2 justify-center">
          <div
            v-for="(image, index) in imageArray"
            :key="index"
            @click.stop="goToFullScreenSlide(index)"
            class="relative cursor-pointer transition-all duration-300 hover:opacity-80 flex-shrink-0"
          >
            <NuxtImg
              loading="lazy"
              :src="image"
              :alt="`Thumbnail ${index + 1}`"
              class="w-16 h-16 object-cover rounded"
            />
            <div
              class="absolute inset-0 bg-teal-500 transition-opacity duration-300"
              :class="{
                'opacity-40': index === currentFullScreenIndex,
                'opacity-0': index !== currentFullScreenIndex,
              }"
            ></div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useTextDivider } from "@/composables/useTextDivider.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

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
const fullScreenImage = ref(null);
const imageLoadedIndex = ref([]);
const fullScreenModal = ref(null);

// Main modal swiper
const mainSwiperInstance = ref(null);
const currentMainIndex = ref(0);

// Full-screen modal swiper
const fullScreenSwiperInstance = ref(null);
const currentFullScreenIndex = ref(0);

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

const setMainSwiper = (swiper) => {
  mainSwiperInstance.value = swiper;
};

const setFullScreenSwiper = (swiper) => {
  fullScreenSwiperInstance.value = swiper;
};

const handleMainSlideChange = () => {
  if (mainSwiperInstance.value) {
    currentMainIndex.value = mainSwiperInstance.value.realIndex;
  }
};

const handleFullScreenSlideChange = () => {
  if (fullScreenSwiperInstance.value) {
    currentFullScreenIndex.value = fullScreenSwiperInstance.value.realIndex;
  }
};

const imageLoaded = (index) => {
  imageLoadedIndex.value[index] = true;
};

const openFullScreenImage = (index) => {
  fullScreenImage.value = imageArray.value[index];
  currentFullScreenIndex.value = index;
  imageLoadedIndex.value = new Array(imageArray.value.length).fill(false);
  nextTick(() => {
    if (fullScreenSwiperInstance.value) {
      fullScreenSwiperInstance.value.slideTo(index, 0);
      // Force update of currentFullScreenIndex after Swiper initialization
      nextTick(() => {
        currentFullScreenIndex.value = fullScreenSwiperInstance.value.realIndex;
      });
    }
    if (fullScreenModal.value) {
      fullScreenModal.value.focus();
    }
  });
};

const closeFullScreenImage = () => {
  fullScreenImage.value = null;
  if (mainSwiperInstance.value) {
    mainSwiperInstance.value.slideTo(currentFullScreenIndex.value, 0);
  }
  currentMainIndex.value = currentFullScreenIndex.value;
};

const goToMainSlide = (index) => {
  if (mainSwiperInstance.value) {
    mainSwiperInstance.value.slideToLoop(index);
  }
};

const goToFullScreenSlide = (index) => {
  if (fullScreenSwiperInstance.value) {
    fullScreenSwiperInstance.value.slideToLoop(index);
  }
};

const goToPreviousFullScreenSlide = () => {
  if (fullScreenSwiperInstance.value) {
    fullScreenSwiperInstance.value.slidePrev();
  }
};

const goToNextFullScreenSlide = () => {
  if (fullScreenSwiperInstance.value) {
    fullScreenSwiperInstance.value.slideNext();
  }
};
const goToPreviousMainSlide = () => {
  if (mainSwiperInstance.value) {
    mainSwiperInstance.value.slidePrev();
  }
};

const goToNextMainSlide = () => {
  if (mainSwiperInstance.value) {
    mainSwiperInstance.value.slideNext();
  }
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
      currentMainIndex.value = 0;
      currentFullScreenIndex.value = 0;
    }
  }
);

onMounted(() => {
  if (props.show) {
    disableBodyScroll();
    document.body.classList.add("modal-open");
  }

  document.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  enableBodyScroll();
  document.body.classList.remove("modal-open");
  document.removeEventListener("keydown", handleKeyDown);
});

const handleKeyDown = (event) => {
  if (fullScreenImage.value) {
    if (event.key === "Escape") {
      closeFullScreenImage();
    } else if (event.key === "ArrowLeft") {
      goToPreviousFullScreenSlide();
    } else if (event.key === "ArrowRight") {
      goToNextFullScreenSlide();
    }
  } else {
    if (event.key === "Escape") {
      closeModal();
    } else if (event.key === "ArrowLeft") {
      goToPreviousMainSlide();
    } else if (event.key === "ArrowRight") {
      goToNextMainSlide();
    }
  }
};
</script>

<style lang="postcss" scoped>
.modal-enter-active,
.modal-leave-active {
  @apply transition-all duration-300 ease-in-out;
}

.modal-enter-from,
.modal-leave-to {
  @apply opacity-0 scale-95;
}

.modal-enter-to,
.modal-leave-from {
  @apply opacity-100 scale-100;
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-300 ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-10;
}

.max-h-80 {
  scrollbar-width: thin;
  scrollbar-color: rgba(94, 234, 212, 0.3) rgba(30, 41, 59, 0.5);
}

.max-h-80::-webkit-scrollbar {
  @apply w-2;
}

.max-h-80::-webkit-scrollbar-track {
  @apply bg-slate-800 bg-opacity-50 rounded;
}

.max-h-80::-webkit-scrollbar-thumb {
  @apply bg-teal-400 bg-opacity-30 rounded border-2 border-slate-800 border-opacity-50;
}

.max-h-80::-webkit-scrollbar-thumb:hover {
  @apply bg-teal-400 bg-opacity-50;
}

.modal-open {
  @apply overflow-hidden;
}

.swiper-button-prev,
.swiper-button-next {
  @apply text-white bg-black bg-opacity-50 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ease-in-out z-10;
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  @apply bg-opacity-75;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  @apply text-xl;
}

.swiper-button-prev {
  @apply left-5;
}

.swiper-button-next {
  @apply right-5;
}
</style>
