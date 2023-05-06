import { useLocalStorage } from "@vueuse/core";


const isOpen = ref(false);
const theme = useLocalStorage("theme", () => "pink");
const themeColors = [
  {
    key: "pink",
    color: "#E85382"
  },
  {
    key: "cyan",
    color: "#39BADF"
  },
  {
    key: "beige",
    color: "#E1A725"
  }
];


export const useTheme = () => {
  const selectTheme = (index) => {
    theme.value = themeColors[index]["key"];
  };

  if(process.client) {
    document.body.dataset.theme = theme.value;
  }


  watch(theme, (value) => {
    if (process.client) {
      document.body.dataset.theme = value;
    }
  }, { immediate: true });

  const toggleOpen = () => {
    isOpen.value = !isOpen.value;
  };

  return {
    themeColors,
    theme,
    isOpen,
    selectTheme,
    toggleOpen
  };
};