tailwind.config = {
  darkMode: "class",

  theme: {
    container: {
      center: true,
    },
    screens: {
      "3xl": {
        min: "1440px",
      },
      "2xl": {
        max: "1440px",
      },
      xl2: {
        max: "1269.98px",
      },
      xl: {
        max: "1199.98px",
      },
      lg: {
        max: "991.98px",
      },
      md: {
        max: "767.98px",
      },
      sm: {
        max: "575.98px",
      },
    },
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(-30deg, #f57f20, #d62b08 100%)",
      },

      colors: {
        main: "#313131",
        xam1: "#C8C9CE",
      },
      fontFamily: {
        main: ["Quicksand", "sans-serif"],
        sub1: ["Agbalumo", "serif"],
      },
      backgroundImage: {
        section7: "linear-gradient(to bottom, white 50%, #0000001A 50%)",
      },
    },
  },
  corePlugins: {
    // preflight: false,
  },
};
// Kiểm tra xem 'module' có tồn tại không (Node.js environment)
if (typeof module !== "undefined" && module.exports) {
  module.exports = tailwind.config;
} else {
  // Trình duyệt environment
  window.tailwind.config = tailwind.config;
}
