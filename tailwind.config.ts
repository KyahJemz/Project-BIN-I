import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      'gray': {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        'red': {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        'yellow': {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        'green': {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        'blue': {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        'indigo': {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
        'purple': {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        'pink': {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
          700: '#BE185D',
          800: '#9D174D',
          900: '#831843',
        },

'header-bg': '#2F4F4F', // Dark slate gray for the header background
  'header-text': '#FFFFFF', // White text for the header
  'hero-bg': '#87CEEB', // Light sky blue for the hero section
  'hero-text': '#333333', // Dark gray for hero text
  'button-bg': '#FFD700', // Gold for buttons
  'button-text': '#333333', // Dark gray text for buttons
  'announcements-bg': '#F5F5F5', // Very light gray for the announcements section
  'announcements-text': '#333333', // Dark gray for announcements text
  'events-bg': '#98FB98', // Pale green for events background
  'events-text': '#FFFFFF', // White text for events section
  'news-bg': '#FFFFFF', // White for news background
  'news-text': '#333333', // Dark gray for news text
  'schedules-bg': '#F5F5F5', // Light gray for schedules background
  'schedules-text': '#333333', // Dark gray for schedules text
  'routes-bg': '#F5F5F5', // Light gray for routes background
  'routes-text': '#333333', // Dark gray for routes text
  'footer-bg': '#228B22', // Forest green for the footer
  'footer-text': '#FFFFFF', // White text for the footer
   

  'forest-green': '#228B22',
  'sky-blue': '#87CEEB',
  'sun-yellow': '#FFD700',
  'olive-green': '#6B8E23',
  'earth-brown': '#8B4513',
  'light-gray': '#F5F5F5',
  'dark-gray': '#333333',
  'white': '#FFFFFF',
    },
    fontFamily: {
      sans: ['Helvetica', 'Arial', 'sans-serif'], 
      serif: ['Georgia', 'serif'], 
    },
  },
  plugins: [],
};

export default config;
