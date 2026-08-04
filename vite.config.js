// vite.config.js
//
// The dev server (npm start) finds every .html file on its own, so this file is
// only needed for npm run build: without it, a production build would include
// index.html and quietly leave the four practical pages out.

// The paths are relative to this folder, which is what Vite calls the root.
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',

        practical1: 'practical-1.html',
        practical2: 'practical-2.html',
        practical3: 'practical-3.html',
        practical4: 'practical-4.html'
      }
    }
  }
})
