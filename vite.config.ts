import { defineConfig } from 'vite'
import vue from "@vitejs/plugin-vue";
import preload from "vite-plugin-preload";

export default defineConfig({
  plugins:[
    vue(),
    preload()
  ],
  assetsInclude: ['**/*.bmp'],
  build: {
    lib: {
      entry: './lib/main.ts',
      name: 'Counter',
      fileName: 'counter'
    },
    commonjsOptions: {
      transformMixedEsModules: true,
      include: ["./lib/openCv/opencv.4.5.0.js"]
    }
  }
})
