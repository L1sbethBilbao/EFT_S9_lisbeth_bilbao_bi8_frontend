import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` debe coincidir con el nombre del repositorio (respetando mayúsculas) para que
// GitHub Pages encuentre los archivos en https://l1sbethbilbao.github.io/EFT_S9_lisbeth_bilbao_bi8_frontend/
export default defineConfig({
  plugins: [react()],
  base: '/EFT_S9_lisbeth_bilbao_bi8_frontend/',
})
