/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'source-sans': ['Source Sans Pro', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontWeight: {
        regular: '400',
      },
      colors: {
        'custom-blue': '#3C8CBC',
        'custom-bg': '#F3F3F3',
        'custom-gray': '#4B5563',
        'custom-border': '#4B5563',
        'customDarkBlue': '#0056B3',
        'custom-border-dark': '#0056B3',
        'custom-green': '#10B981',  // Custom green color
        'custom-border-green': '#047857', // Custom green border color
      },
    },
  },
  plugins: [
    // Custom utility classes
    function ({ addComponents }) {
      addComponents({
        '.text-custom-white': {
          color: '#ffffff', // You can customize this color if needed
        },
        '.blue-theme': {
          backgroundColor: '#3B82F6', // Custom blue background
          color: '#ffffff',           // Custom white text color
          borderColor: '#4B5563',
          borderBottomWidth: '1px',  // Set bottom border width
          borderRightWidth: '1px',  // Set right border width
          borderBottomColor: '#4B5563',  // Set custom bottom border color
          borderRightColor: '#4B5563',
        },
        '.blue-theme-hover': {
          '&:hover': {
            backgroundColor: '#2b6cb0', // Hover state color
            borderColor: '#0056B3',     // Hover border color
            borderBottomColor: 'transparent', // Set bottom border to none
            borderRightColor: 'transparent', // Set right border to none
          },
        },

        '.gray-theme': {
          backgroundColor: '#F3F3F3',  // Custom light background
          color: '#4B5563',  // Custom gray text color
          borderBottomWidth: '1px',  // Bottom border width
          borderRightWidth: '1px',  // Right border width
          borderColor: '#4B5563',  // Custom border color


          // Hover effect for light-theme class
          '&:hover': {
            backgroundColor: '#D1D5DB',  // Hover background color (gray-300)
            borderColor: '#D1D5DB',  // Hover border color (gray-300)
            color: '#000000',  // Hover text color (black)
          },
        },

        // Green theme
        '.green-theme': {
          backgroundColor: '#3bf654',  // Custom green background
          color: '#ffffff',  // White text color
          borderColor: '#047857',  // Custom green border
          borderBottomWidth: '1px',  // Set bottom border width
          borderRightWidth: '1px',  // Set right border width
          borderBottomColor: '#0a4715',  // Custom green bottom border color
          borderRightColor: '#0a4715',  // Custom green right border color
        },

        '.green-theme-hover': {
          '&:hover': {
            backgroundColor: '#16ef33',  // Hover state color (darker green)
            borderColor: '#047857',  // Hover border color (green)
            borderBottomColor: 'transparent',  // Remove bottom border on hover
            borderRightColor: 'transparent',  // Remove right border on hover
          },
        },
      });
    },
  ],
}
