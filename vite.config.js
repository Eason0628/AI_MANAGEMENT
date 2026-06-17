import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import url from "url";
import path, { dirname } from "path";
import { viteMockServe } from "vite-plugin-mock";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
  viteMockServe({
    mockPath: "src/mock",
    logger: true,
    supportTs: false
  })
],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000,
    inline: false,
    host: '0.0.0.0',
    proxy: {
      "/api": {
        target: "http://127.0.0.1:9090",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        changeOrigin: true,
        onProxyReq: (proxyReq, req, res) => {
          console.log('原始请求:', req.url);
          console.log('代理路径:', proxyReq.path);
        }
      },
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    minify: "terser",
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
