// tailwind.config.js
const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      prefix: "heroui",
      addCommonColors: false,
      defaultTheme: "dark",
      defaultExtendTheme: "dark",
      layout: {
        borderRadius: "8px",
      },
      themes: {
        light: {
          layout: {

          },
          colors: {
            primary: {
              foreground: '#000000',
              DEFAULT: "#9333EA", 
            },
            secondary: "#7E22CE", // Un tono más oscuro para contraste
            text: "#2D2D2D", // Texto oscuro para buena lectura
            accent: "#E9D5FF", // Color de detalles/acento
            border: "#C4B5FD",
            background: "#f4f1fc", // Morado muy claro
          },
        },
        dark: {
          layout: {

          },
          colors: {
            primary: {
              foreground: '#000000',
              DEFAULT: "#A855F7", 
            },
            secondary: "#7E22CE", // Mantiene el contraste
            text: "#EDE9FE", // Texto claro en oscuro
            accent: "#4C1D95", // Un púrpura más profundo para resaltar
            border: "#6D28D9",
            background: "#1f1c29", // Fondo oscuro con tono púrpura
            content1: "#232323", // Fondo oscuro para contenido
            foreground: "#EDE9FE", // Texto claro para contenido
            focus: "#d3d3d3", // Color de foco para accesibilidad
            overlay: "#00000080", // Fondo oscuro para overlay
            // default: "#2D2D2D", // Texto oscuro para buena
            // content2: "#2D2D2D", // Texto oscuro para buena
            // content3: "#2D2D2D", // Texto oscuro para buena
            // content4: "#2D2D2D", // Texto oscuro para buena
            
          },
        },
      },
    }),
  ],
};
