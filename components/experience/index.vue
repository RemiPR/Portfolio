<!-- components/experience/index.vue -->
<template>
  <li class="mb-12">
    <div
      @click="showModal = true"
      class="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 cursor-pointer"
    >
      <div
        class="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"
      ></div>
      <header
        class="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2"
        :aria-label="job.period"
      >
        {{ job.period }}
      </header>
      <div class="z-10 sm:col-span-6">
        <h3 class="font-medium leading-snug text-slate-200">
          <div>
            <span
              class="inline-flex items-baseline font-semibold leading-tight text-slate-200 group/link text-lg"
            >
              <span>{{ job.title }}</span>
            </span>
          </div>
          <div>
            <span class="text-teal-300 text-sm italic">{{ job.company }}</span>
          </div>
        </h3>
        <p class="mt-2 text-sm leading-normal">{{ job.description }}</p>
        <ul class="mt-2 flex flex-wrap" aria-label="Technologies used">
          <li v-for="skill in job.skills" :key="skill" class="mr-1.5 mt-2">
            <div
              class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300"
            >
              {{ skill }}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Modal
      :show="showModal"
      :title="job.title"
      :subtitle="job.company"
      :detailedDescription="job.detailedDescription || job.description"
      :technologies="job.skills"
      :websiteUrl="typeof job.link === 'string' ? job.link : ''"
      :githubUrl="job.github"
      @close="showModal = false"
    />
  </li>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  job: {
    type: Object,
    required: true,
  },
});

const showModal = ref(false);
</script>
