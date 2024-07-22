/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode:"jit",
  theme: {
    fontFamily:{
     Robot:["Roboto","sans-sarif"],
     Poppins:['Poppins','sans-sarif']
    },
    extend: {
      colors:{
        primary:"#322CA1",
        secondary:"#564EDB",
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

