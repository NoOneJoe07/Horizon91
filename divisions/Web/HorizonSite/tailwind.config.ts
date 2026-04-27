export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        h91: {
          gravity: "#05070A",        // Noir gravité (fond principal)
          relativistic: "#1A8CFF",   // Bleu relativiste (jets polaires)
          ion: "#00F0FF",            // Cyan ionisé (plasma)
          accretion: "#FF7A1A",      // Orange accrétion (disque chauffé)
          fusion: "#FFD65C",         // Jaune fusion (lumière chaude)
          warp: "#6A00FF",           // Violet gravitationnel (distorsion)
          stellar: "#F2F7FF",        // Blanc stellaire (texte lisible)
        },
      },
    },
  },
  plugins: [],
};

