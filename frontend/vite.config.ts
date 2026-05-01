import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import critical from 'rollup-plugin-critical'

// Fix for __dirname in ESM
const __dirname = path.resolve();

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    critical({
      criticalUrl: '/',
      criticalBase: 'dist/',
      criticalPages: [
        { uri: '/', template: 'index' }
      ],
      criticalConfig: {
        inline: true,
        minify: true,
        width: 1300,
        height: 900,
      }
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz'
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('lucide-react') || id.includes('@radix-ui')) return 'vendor-ui';
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})

