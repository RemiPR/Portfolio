<!-- pages/index.vue-->
<template>
  <div
    class="bg-slate-900 leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900"
  >
    <Transition name="fade" mode="out-in">
      <LoadingSpinner v-if="isLoading" key="loading" />
      <div v-else :key="languageKey">
        <!-- Mobile layout -->
        <div class="lg:hidden">
          <NavigationMobile
            @open-modal="openBurgerModal"
            @language-changing="handleLanguageChange"
          />
          <NavigationMobileBurgerModal
            :is-open="isBurgerModalOpen"
            :nav-items="navItems"
            @close="closeBurgerModal"
            @language-changing="handleLanguageChange"
          />
        </div>

        <div
          class="mx-auto min-h-screen max-w-[1350px] px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0"
        >
          <div class="lg:flex lg:justify-between lg:gap-4">
            <!-- Mobile header - visible only on mobile and tablet -->
            <header class="lg:hidden py-6">
              <h1 class="text-3xl font-bold tracking-tight text-slate-200">
                {{ $t("name") }}
              </h1>
              <h2
                class="mt-2 text-lg font-medium tracking-tight text-slate-200"
              >
                {{ $t("jobTitle") }}
              </h2>
            </header>

            <!-- Left column (fixed) - visible only on desktop -->
            <header
              class="hidden lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[528px] lg:flex-col lg:py-24"
            >
              <div class="lg:h-[470px] mb-2 lg:mb-36 relative">
                <h1
                  class="text-4xl font-bold tracking-tight text-slate-200 sm:text-4xl xl:text-5xl"
                  style="letter-spacing: -0.025em"
                >
                  {{ $t("name") }}
                </h1>
                <h2
                  class="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl"
                >
                  {{ $t("jobTitle") }}
                </h2>
                <p class="mt-4 max-w-xs leading-normal">{{ $t("shortBio") }}</p>

                <div class="mt-4 space-y-2 overflow-visible">
                  <div class="relative z-10">
                    <LanguageToggler
                      @language-changing="handleLanguageChange"
                    />
                  </div>
                </div>

                <!-- Navigation -->
                <div class="mt-6">
                  <NavigationDesktop :navItems="navItems" />
                </div>
              </div>

              <div class="overflow-y-auto hover:overflow-y-auto flex-grow">
                <ContactForm />
              </div>
            </header>

            <!-- Right column (scrollable) -->
            <main id="content" class="lg:w-[528px] lg:py-24">
              <section
                id="about"
                class="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
                aria-label="About me"
              >
                <div
                  class="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 backdrop-blur md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-100"
                >
                  <button
                    @click="toggleContent"
                    class="flex items-center justify-between w-full text-left lg:cursor-default lg:hidden"
                    :aria-expanded="isContentVisible"
                  >
                    <h2 class="text-2xl font-bold lg:mb-4 text-slate-200">
                      {{ $t("about.title") }}
                    </h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 transform transition-transform duration-200 lg:hidden"
                      :class="{ 'rotate-180': isContentVisible }"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
                <div v-show="isContentVisible" class="lg:block">
                  <p
                    class="mb-4"
                    v-for="(paragraph, index) in styledAboutParagraphs"
                    :key="`${languageKey}-about-${index}`"
                    v-html="paragraph"
                  ></p>
                </div>
              </section>

              <!-- Experience section -->
              <section
                id="experience"
                class="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
                aria-label="Work experience"
              >
                <div>
                  <div class="flex justify-between items-center mb-4">
                    <div class="flex items-center space-x-4">
                      <h2 class="text-2xl font-bold text-slate-200">
                        {{ $t("experience.title") }}
                      </h2>
                      <ContactSocialDesktop />
                    </div>

                    <a
                      :href="$t('experience.resumeUrl')"
                      download
                      class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-teal-300 hover:text-teal-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-150"
                    >
                      <svg
                        class="mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      {{ $t("experience.downloadResume") }}
                    </a>
                  </div>
                  <ol class="group/list">
                    <Experience
                      v-for="(job, index) in experienceItems"
                      :key="`${languageKey}-experience-${index}`"
                      :job="job"
                    />
                  </ol>
                </div>
              </section>
              <!-- Projects section -->
              <section
                id="projects"
                class="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
                aria-label="Selected projects"
              >
                <div>
                  <h2 class="text-2xl font-bold mb-4 text-slate-200">
                    {{ t("projects.title") }}
                  </h2>
                  <ul class="group/list">
                    <MyProjects
                      v-for="project in projects"
                      :key="`${languageKey}-${project.title}`"
                      :project="project"
                    />
                  </ul>
                </div>
              </section>
              <section class="mt-24 text-sm text-slate-500">
                <p>
                  {{ $t("builtWith") }}
                </p>
              </section>
            </main>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const isLoading = inject("isLoading", ref(false));
const languageKey = computed(() => locale.value);

const isBurgerModalOpen = ref(false);

const isContentVisible = ref(true);

const toggleContent = () => {
  if (window.innerWidth < 1024) {
    isContentVisible.value = !isContentVisible.value;
  }
};

const openBurgerModal = () => {
  isBurgerModalOpen.value = true;
};

const closeBurgerModal = () => {
  isBurgerModalOpen.value = false;
};

// Navigation
const navItems = computed(() => [
  { id: "about", name: t("nav.about") },
  { id: "experience", name: t("nav.experience") },
  { id: "projects", name: t("nav.projects") },
]);

// Bio Text styling
const highlightText = (text, color = "text-slate-200") => {
  return `<span class="${color}">${text}</span>`;
};

// About section
const aboutParagraphs = computed(() => {
  const paragraphCount = 6; // Update this if you add or remove paragraphs
  return Array.from({ length: paragraphCount }, (_, i) =>
    t(`about.paragraphs.${i}`)
  );
});

const styledAboutParagraphs = computed(() => {
  return aboutParagraphs.value.map((paragraph) => {
    return paragraph.replace(
      /Remi|Nuxt Vue|Nuxt|Vue|Erasmus|Latvia|Germany|Riga|Latvijoje|Rygoje|Vokietijoje|Sveiki!/g,
      (match) => highlightText(match)
    );
  });
});

// Experience section
const experienceItems = computed(() => {
  const itemCount = 3; // Update this if you add or remove experience items
  return Array.from({ length: itemCount }, (_, i) => ({
    period: t(`experience.items.${i}.period`),
    title: t(`experience.items.${i}.title`),
    company: t(`experience.items.${i}.company`),
    link: t(`experience.items.${i}.link`),
    description: t(`experience.items.${i}.description`),
    detailedDescription: t(`experience.items.${i}.detailedDescription`),
    skills: t(`experience.items.${i}.skills`)
      .split(",")
      .map((skill) => skill.trim()),
    github: t(`experience.items.${i}.github`),
  }));
});

// Projects section
const projects = computed(() => {
  const projectCount = 5; // Update this if you add or remove projects
  return Array.from({ length: projectCount }, (_, i) => ({
    title: t(`projects.items.${i}.title`),
    company: t(`projects.items.${i}.company`),
    link: t(`projects.items.${i}.link`),
    github: t(`projects.items.${i}.github`),
    image: t(`projects.items.${i}.image`),
    images: t(`projects.items.${i}.images`)
      .split(",")
      .map((skill) => skill.trim()),
    description: t(`projects.items.${i}.description`),
    detailedDescription: t(`projects.items.${i}.detailedDescription`),
    skills: t(`projects.items.${i}.skills`)
      .split(",")
      .map((skill) => skill.trim()),
  }));
});

const handleLanguageChange = async (isChanging) => {
  isLoading.value = isChanging;
  if (isChanging) {
    setTimeout(() => {
      isLoading.value = false;
    }, 1250); // Adjust this timeout as needed
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.5s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

/* Styles for WebKit browsers (Chrome, Safari) */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: #1e293b; /* Tailwind's slate-800 */
}

::-webkit-scrollbar-thumb {
  background-color: #475569; /* Tailwind's slate-600 */
  border-radius: 6px;
  border: 3px solid #1e293b; /* Tailwind's slate-800 */
}

/* Styles for Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #475569 #1e293b; /* Tailwind's slate-600 and slate-800 */
}
</style>
