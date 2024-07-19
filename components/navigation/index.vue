<!-- components/navigation/index.vue -->
<template>
  <nav class="nav hidden lg:block" aria-label="In-page jump links">
    <ul class="mt-16 w-max">
      <li v-for="item in navItems" :key="item.id">
        <a
          :class="[
            'group flex items-center py-3',
            { active: activeSection === item.id },
          ]"
          :href="`#${item.id}`"
          @click.prevent="scrollTo(item.id)"
        >
          <span
            :class="[
              'nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none',
              { '!w-16 !bg-slate-200': activeSection === item.id },
            ]"
          ></span>
          <span
            :class="[
              'nav-text text-base font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200',
              { '!text-slate-200': activeSection === item.id },
            ]"
          >
            {{ item.name }}
          </span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  navItems: {
    type: Array,
    required: true,
  },
});

const activeSection = ref("");

const scrollTo = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const handleScroll = () => {
  const scrollPosition = window.scrollY + window.innerHeight / 3;

  for (let i = props.navItems.length - 1; i >= 0; i--) {
    const section = document.getElementById(props.navItems[i].id);
    if (section && section.offsetTop <= scrollPosition) {
      activeSection.value = props.navItems[i].id;
      break;
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Set initial active section
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.active {
  font-weight: bold;
  color: #e2e8f0 !important; /* slate-200 */
}
</style>
