import { ref, onMounted } from "vue";

export function useScrollLock() {
  const scrollPosition = ref(0);
  const isLocked = ref(false);

  onMounted(() => {
    // Calculate scrollbar width
    const scrollDiv = document.createElement("div");
    scrollDiv.style.width = "100px";
    scrollDiv.style.height = "100px";
    scrollDiv.style.overflow = "scroll";
    scrollDiv.style.position = "absolute";
    scrollDiv.style.top = "-9999px";
    document.body.appendChild(scrollDiv);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    // Set scrollbar width as a CSS variable
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      `${scrollbarWidth}px`
    );
  });

  const lockScroll = () => {
    if (!isLocked.value) {
      scrollPosition.value = window.pageYOffset;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition.value}px`;
      document.body.style.width = "100%";
      isLocked.value = true;
    }
  };

  const unlockScroll = () => {
    if (isLocked.value) {
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("position");
      document.body.style.removeProperty("top");
      document.body.style.removeProperty("width");
      window.scrollTo(0, scrollPosition.value);
      isLocked.value = false;
    }
  };

  return {
    lockScroll,
    unlockScroll,
  };
}
