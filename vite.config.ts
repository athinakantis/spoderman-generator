import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __HAIR_COUNT__: fs.readdirSync('./public/spoderman/hair').length,
    __EYES_COUNT__: fs.readdirSync('./public/spoderman/eyes').length,
    __MOUTH_COUNT__: fs.readdirSync('./public/spoderman/mouth').length,
    __CLOTHING_COUNT__: fs.readdirSync('./public/spoderman/clothing').length,
  },
})
