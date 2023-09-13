import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'

export default defineConfig({
  plugins: [sveltekit()],
  esbuild: {
      legalComments: "none",
      // This is magix
      // minifyIdentifiers: false,
      // Disable console
      drop: ["console", "debugger"]
  },
  build: {
    target: "esnext",
    sourcemap: true
},
css: {
    devSourcemap: true
},
  // allows vite access to ./posts
  server: {
    fs: {
      allow: ['./']
    }
  }
})
