/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    'node_modules/preline/dist/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '',
        'secondary-color': '',
        'tertiary-color': '',
        'confirm-color': '',
        'edit-color': '',
        'delete-color': '',
        'cancel-color': '',
      },
      screens:{
        'xxs': '360px',
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'mdx': '990px', 
        'lg': '1024px',
        'slg': '1120px',
        'xl': '1280px',
        '2xl': '1536px',
      
      }
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}

