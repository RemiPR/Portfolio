<!-- components/project/index.vue -->
<template>
  <li class="mb-12">
    <div
      @click="showModal = true"
      class="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 cursor-pointer"
    >
      <div
        class="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"
      ></div>
      <div class="z-10 sm:order-2 sm:col-span-6 flex flex-col">
        <h3>
          <span
            class="inline-flex items-baseline font-medium leading-tight text-slate-200 group/link text-lg"
          >
            <span
              class="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"
            ></span>
            <span>{{ project.title }}</span>
          </span>
        </h3>
        <div
          v-if="project.image"
          class="relative w-full h-[150px] overflow-hidden rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 mt-2 sm:hidden"
        >
          <NuxtImg
            placeholder
            :alt="`${project.title} project screenshot`"
            loading="lazy"
            decoding="async"
            :src="project.image"
            class="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
        <p class="mt-2 text-sm leading-normal">{{ project.description }}</p>
        <ul class="mt-2 flex flex-wrap" aria-label="Technologies used:">
          <li v-for="skill in project.skills" :key="skill" class="mr-1.5 mt-2">
            <div
              class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300"
            >
              {{ skill }}
            </div>
          </li>
        </ul>
      </div>
      <div
        v-if="project.image"
        class="relative w-full h-[100px] overflow-hidden rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1 hidden sm:block"
      >
        <NuxtImg
          placeholder
          :alt="`${project.title} project screenshot`"
          loading="lazy"
          decoding="async"
          :src="project.image"
          class="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>
    </div>

    <Modal
      :show="showModal"
      :title="project.title"
      :subtitle="project.company"
      :detailedDescription="project.detailedDescription || project.description"
      :images="project.images"
      :technologies="project.skills"
      :websiteUrl="project.link"
      :githubUrl="project.github"
      @close="showModal = false"
    />
  </li>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const showModal = ref(false);
</script>
