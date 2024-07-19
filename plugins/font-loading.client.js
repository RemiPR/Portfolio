// plugins/font-loading.client.js
export default defineNuxtPlugin(() => {
  if (process.client) {
    const minDisplayTime = 1000; // Minimum time to display the loader (in milliseconds)
    const startTime = Date.now();

    const fontLoadPromise = Promise.all([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, minDisplayTime)),
    ])
      .then(() => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
        return new Promise((resolve) => setTimeout(resolve, remainingTime));
      })
      .then(() => {
        document.documentElement.classList.add("fonts-loaded");
      });

    // Optional: Add a timeout to prevent infinite waiting
    setTimeout(() => {
      document.documentElement.classList.add("fonts-loaded");
    }, 5000); // 5 seconds timeout (increased from 3 to 5)

    return {
      provide: {
        fontLoadPromise,
      },
    };
  }
});
