import { defineConfig } from 'vite';
import { join } from "path";
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    }
  },
  plugins: [vue(), vueJsx()]
})
