import { UserConfig, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { telefunc } from 'telefunc/vite';

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [react(), telefunc(), {
    name: 'server:entry',
    config(_, env) {
      if (!env.isSsrBuild) return
      return {
        build: {
          rollupOptions: {
            input: {
              'entry-server': './src/server.js'
            }
          }
        }
      }
    }
  }
],

})


// const port = 3000

// export default defineConfig({
//   plugins: [
//     react(),
//     telefunc(),
//   ],
//   build: { target: 'esnext' },
//   appType: 'mpa',
//   server: { port, host: true },
//   preview: { port },
// }) as UserConfig
