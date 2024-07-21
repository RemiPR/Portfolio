<!-- components/contact/form/index.vue -->
<template>
  <div class="flex flex-col">
    <div v-if="!initiallyOpen" class="h-12">
      <button
        @click="handleClick"
        class="flex items-center text-2xl font-bold text-slate-200 hover:text-teal-300 transition-colors duration-300"
      >
        <span>{{ $t("contactForm.contact") }}</span>
        <svg
          ref="iconRef"
          class="ml-2 w-8 h-8 transition-transform duration-300"
          :class="{
            'rotate-360': isFormVisible,
            'animate-attention': showAttentionAnimation && !isFormVisible,
          }"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
          />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      </button>
    </div>
    <div v-else>
      <h3 class="text-center text-lg font-semibold text-teal-100">
        {{ $t("contactForm.mobileTitle") }}
      </h3>
    </div>

    <Transition name="expand">
      <form
        v-if="isFormVisible || initiallyOpen"
        @submit.prevent="onSubmit"
        class="mt-4 p-4 bg-slate-800 rounded-lg shadow-lg w-full space-y-4"
        :class="{
          'mt-2 mb-6 p-6': initiallyOpen,
          'max-w-sm': !initiallyOpen,
          'sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl': initiallyOpen,
          'sm:p-6 md:p-8 lg:space-y-6': initiallyOpen,
        }"
      >
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              for="from_name"
              class="block text-sm font-medium text-slate-200 mb-1 sm:mb-2"
            >
              {{ $t("contactForm.name") }}
            </label>
            <input
              v-model="from_name"
              v-bind="nameAttrs"
              id="from_name"
              type="text"
              class="mt-1 block w-full rounded-md bg-slate-700 border-slate-600 text-slate-200 focus:border-teal-500 focus:ring-teal-500 py-2 px-3 text-base"
              :class="{
                'border-red-500': errors.from_name,
                'sm:py-3 sm:px-4 md:text-lg': initiallyOpen,
              }"
            />
            <span class="text-red-500 text-xs mt-1">{{
              errors.from_name
            }}</span>
          </div>
          <div>
            <label
              for="from_email"
              class="block text-sm font-medium text-slate-200 mb-1 sm:mb-2"
            >
              {{ $t("contactForm.email") }}
            </label>
            <input
              v-model="from_email"
              v-bind="emailAttrs"
              id="from_email"
              type="email"
              class="mt-1 block w-full rounded-md bg-slate-700 border-slate-600 text-slate-200 focus:border-teal-500 focus:ring-teal-500 py-2 px-3 text-base"
              :class="{
                'border-red-500': errors.from_email,
                'sm:py-3 sm:px-4 md:text-lg': initiallyOpen,
              }"
            />
            <span class="text-red-500 text-xs mt-1">{{
              errors.from_email
            }}</span>
          </div>
        </div>
        <div>
          <label
            for="message"
            class="block text-sm font-medium text-slate-200 mb-1 sm:mb-2"
          >
            {{ $t("contactForm.message") }}
          </label>
          <textarea
            v-model="message"
            v-bind="messageAttrs"
            id="message"
            :rows="initiallyOpen ? 6 : 4"
            class="mt-1 block w-full rounded-md bg-slate-700 border-slate-600 text-slate-200 focus:border-teal-500 focus:ring-teal-500 py-2 px-3 text-base"
            :class="{
              'border-red-500': errors.message,
              'sm:py-3 sm:px-4 md:text-lg': initiallyOpen,
            }"
          ></textarea>
          <span class="text-red-500 text-xs mt-1">{{ errors.message }}</span>
        </div>
        <div class="flex items-center justify-center">
          <button
            type="submit"
            class="py-2 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-slate-900 bg-teal-400 hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-300 relative overflow-hidden"
            :class="{
              'w-full sm:w-auto sm:py-3 sm:px-8 md:text-lg': initiallyOpen,
            }"
            :disabled="isSubmitting"
          >
            <span :class="{ 'opacity-0': isSubmitting }">
              {{ $t("contactForm.submit") }}
            </span>
            <span
              v-if="isSubmitting"
              class="absolute inset-0 flex items-center justify-center"
            >
              <svg
                class="animate-spin h-5 w-5 text-slate-900"
                :class="{ 'sm:h-6 sm:w-6': initiallyOpen }"
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
            </span>
          </button>
        </div>
      </form>
    </Transition>

    <!-- Centered Notification -->
    <Transition name="fade-scale">
      <div
        v-if="notification"
        class="fixed inset-0 flex items-center justify-center z-50"
      >
        <div
          class="bg-slate-800 text-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4 flex items-center space-x-4"
        >
          <svg
            v-if="notification.type === 'success'"
            class="h-6 w-6 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <svg
            v-else
            class="h-6 w-6 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          <p class="text-lg font-medium">{{ notification.message }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useForm } from "vee-validate";
import * as yup from "yup";
import emailjs from "@emailjs/browser";
import { useRuntimeConfig } from "#app";

const { t } = useI18n();
const config = useRuntimeConfig();

const props = defineProps({
  initiallyOpen: {
    type: Boolean,
    default: false,
  },
});

const isFormVisible = ref(props.initiallyOpen);
const showAttentionAnimation = ref(true);
const iconRef = ref(null);
const isSubmitting = ref(false);
const notification = ref(null);

const schema = yup.object({
  from_name: yup
    .string()
    .required(t("contactForm.validation.name.required"))
    .min(2, t("contactForm.validation.name.min"))
    .matches(
      /^[a-zA-Z]+(\s[a-zA-Z]+)?$/,
      t("contactForm.validation.name.onlyLetters")
    )
    .max(30, t("contactForm.validation.name.max")),
  from_email: yup
    .string()
    .email(t("contactForm.validation.email.invalid"))
    .required(t("contactForm.validation.email.required"))
    .max(30, t("contactForm.validation.email.max")),
  message: yup
    .string()
    .required(t("contactForm.validation.message.required"))
    .min(10, t("contactForm.validation.message.min"))
    .max(5000, t("contactForm.validation.message.max")),
});

const { defineField, errors, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

const [from_name, nameAttrs] = defineField("from_name");
const [from_email, emailAttrs] = defineField("from_email");
const [message, messageAttrs] = defineField("message");

const handleClick = () => {
  if (!props.initiallyOpen) {
    showAttentionAnimation.value = false;
    isFormVisible.value = !isFormVisible.value;
  }
};

const showNotification = (type, message) => {
  notification.value = { type, message };
  setTimeout(() => {
    notification.value = null;
  }, 3000);
};

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;

  try {
    const serviceId = config.public.emailjsServiceId;
    const templateId = config.public.emailjsTemplateId;

    const templateParams = {
      ...values,
      reply_to: values.from_email,
    };

    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      config.public.emailjsPublicKey
    );

    if (response.status === 200) {
      showNotification("success", t("contactForm.submitSuccess"));
      resetForm();
      isFormVisible.value = false;
    } else {
      throw new Error("Email sending failed");
    }
  } catch (error) {
    showNotification("error", t("contactForm.submitError"));
  } finally {
    isSubmitting.value = false;
  }
});

onMounted(() => {
  emailjs.init(config.public.emailjsPublicKey);

  setTimeout(() => {
    showAttentionAnimation.value = false;
  }, 5000); // Stop animation after 5 seconds
});
</script>

<style scoped>
.rotate-360 {
  transition: transform 1s;
  transform: rotate(360deg);
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.5s ease;
  max-height: 1000px;
  opacity: 1;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  transform: scaleY(0);
}

@keyframes attention {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.animate-attention {
  animation: attention 1s ease-in-out infinite;
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
