import withMt from "@material-tailwind/react/utils/withMT";

module.exports = withMt({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "slate-50": "#f8fafc",
        "slate-100": "#f1f5f9",
        "slate-200": "#e2e8f0",
        "slate-300": "#cbd5e1",
        "slate-400": "#94a3b8",
        "slate-500": "#64748b",
        "slate-600": "#475569",
        "slate-700": "#334155",
        "slate-800": "#1e293b",
        "slate-900": "#0f172a",
        "slate-950": "#020617",
        "blue-50": "#eff6ff",
        "blue-100": "#dbeafe",
        "blue-200": "#bfdbfe",
        "blue-300": "#93c5fd",
        "blue-400": "#60a5fa",
        "blue-500": "#3b82f6",
        "blue-600": "#2563eb",
        "blue-700": "#1d4ed8",
        "blue-800": "#1e40af",
        "blue-900": "#1e3a8a",
        "blue-950": "#172554",
        "red-50": "#fef2f2",
        "red-100": "#fee2e2",
        "red-200": "#fecaca",
        "red-300": "#fca5a5",
        "red-400": "#f87171",
        "red-500": "#ef4444",
        "red-600": "#dc2626",
        "red-700": "#b91c1c",
        "red-800": "#991b1b",
        "red-900": "#7f1d1d",
        "red-950": "#450a0a",
        "green-50": "#f0fdf4",
        "green-100": "#dcfce7",
        "green-200": "#bbf7d0",
        "green-300": "#86efac",
        "green-400": "#4ade80",
        "green-500": "#22c55e",
        "green-600": "#16a34a",
        "green-700": "#15803d",
        "green-800": "#166534",
        "green-900": "#14532d",
        "green-950": "#052e16",
        "yellow-50": "#fefce8",
        "yellow-100": "#fef9c3",
        "yellow-200": "#fef08a",
        "yellow-300": "#fde047",
        "yellow-400": "#facc15",
        "yellow-500": "#eab308",
        "yellow-600": "#ca8a04",
        "yellow-700": "#a16207",
        "yellow-800": "#854d0e",
        "yellow-900": "#713f12",
        "yellow-950": "#422006",
        "pink-50": "#fdf2f8",
        "pink-100": "#fce7f3",
        "pink-200": "#fbcfe8",
        "pink-300": "#f9a8d4",
        "pink-400": "#f472b6",
        "pink-500": "#ec4899",
        "pink-600": "#db2777",
        "pink-700": "#be185d",
        "pink-800": "#9d174d",
        "pink-900": "#831843",
        "pink-950": "#500724",
        "purple-50": "#faf5ff",
        "purple-100": "#f3e8ff",
        "purple-200": "#e9d5ff",
        "purple-300": "#d8b4fe",
        "purple-400": "#c084fc",
        "purple-500": "#a855f7",
        "purple-600": "#9333ea",
        "purple-700": "#7e22ce",
        "purple-800": "#6b21a8",
        "purple-900": "#581c87",
        "purple-950": "#3b0764",
        green: "#008000",
        blue: "#0000ff",
        red: "#ff0000",
        purple: "#800080",
        yellow: "#ffff00",
        pink: "#ffc0cb",
        orange: "#ffa500",
        grey: "#808080",
      },
    },
  },
  plugins: [],
});
