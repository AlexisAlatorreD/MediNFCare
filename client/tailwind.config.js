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
        sm: '640px',
        md: '768px',
        lg: '1024px',
      
      }
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}

