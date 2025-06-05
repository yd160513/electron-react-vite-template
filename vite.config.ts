import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron/simple'

export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: 'electron/main/index.ts',
        vite: {
          build: {
            outDir: 'dist-electron/main',
          },
        },
      },
      preload: {
        input: {
          index: 'electron/preload/index.ts',
        },
        vite: {
          build: {
            outDir: 'dist-electron/preload',
          }
        }
      }
    })
  ],
  build: {
    outDir: 'dist',
    assetsDir: '',
  }
})