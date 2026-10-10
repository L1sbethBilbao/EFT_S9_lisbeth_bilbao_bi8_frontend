import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` debe coincidir con el nombre del repositorio (respetando mayúsculas) para que
// GitHub Pages encuentre los archivos en https://l1sbethbilbao.github.io/Bi_Exp3_S8_Lisbeth_Bilbao/
export default defineConfig({
  plugins: [react()],
  base: '/Bi_Exp3_S8_Lisbeth_Bilbao/',
})
