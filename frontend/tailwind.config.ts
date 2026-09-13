import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-app)',
        surface: {
          DEFAULT: 'var(--bg-surface)',
          secondary: 'var(--bg-surface-secondary)',
          elevated: 'var(--bg-surface-elevated)',
          hover: 'var(--bg-surface-hover)',
        },
        border: {
          DEFAULT: 'var(--border-subtle)',
          strong: 'var(--border-strong)',
          focus: 'var(--border-focus)',
        },
        foreground: {
          DEFAULT: 'var(--fg-primary)',
          muted: 'var(--fg-muted)',
          subtle: 'var(--fg-subtle)',
        },
        accent: {
          DEFAULT: '#3b82f6',
          hover: '#60a5fa',
          soft: 'rgba(59, 130, 246, 0.12)',
        },
        risk: {
          critical: '#ef4444',
          'critical-bg': 'rgba(239, 68, 68, 0.12)',
          high: '#f97316',
          'high-bg': 'rgba(249, 115, 22, 0.12)',
          medium: '#f59e0b',
          'medium-bg': 'rgba(245, 158, 11, 0.12)',
          low: '#10b981',
          'low-bg': 'rgba(16, 185, 129, 0.12)',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
