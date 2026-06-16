import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const devRouter = {
  name: 'dev-router',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url.startsWith('/group/') || req.url === '/confidentialite') {
        req.url = '/app.html'
      }
      next()
    })
  },
}

export default defineConfig({
  plugins: [react(), devRouter],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        application: 'application.html',
        app: 'app.html',
      },
    },
  },
})
