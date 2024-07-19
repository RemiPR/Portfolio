<!-- components/LoadingSpinner.vue -->
<template>
  <div class="loading-spinner">
    <div class="spinner-container">
      <div class="spinner"></div>
      <p class="spinner-text">{{ t("loading") }}</p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped>
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(15, 23, 42, 0.9); /* bg-slate-900 with opacity */
}

.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(94, 234, 212, 0.3); /* teal-300 with opacity */
  border-top: 3px solid #5eead4; /* teal-300 */
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
}

.spinner-text {
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #e2e8f0; /* text-slate-200 */
  letter-spacing: 0.05em;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
