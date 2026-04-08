import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server:{
    proxy:{
      "/auth":"http://localhost:3000",
      "/login":"http://localhost:3000",
      "/todos":"http://localhost:3000",
      
    }
  }
})
