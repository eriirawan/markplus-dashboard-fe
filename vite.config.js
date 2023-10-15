import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import { VitePluginFonts } from 'vite-plugin-fonts';
import svgrPlugin from 'vite-plugin-svgr';
import VitePluginHtmlEnv from 'vite-plugin-html-env';
import removeConsole from 'vite-plugin-remove-console';
import viteCompression from 'vite-plugin-compression';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const buildHash = Date.now();

export default ({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
  return defineConfig({
    base: '/',
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes(`"use client"`)) {
            return;
          }
          warn(warning);
        },
        output: {
          assetFileNames: `[name]-${buildHash}.[ext]`,
          chunkFileNames: `[name]-${buildHash}.js`,
          entryFileNames: `[name]-${buildHash}.js`,
        },
      },
    },
    define: {
      'process.env': { ...process.env, ...loadEnv(mode, process.cwd()) },
      'process.env.NODE_ENV': `"${mode}"`,
    },
    esbuild: {
      drop:
        process.env.VITE_API_MODE !== 'dev' && process.env.VITE_API_MODE !== 'staging'
          ? ['console', 'debugger']
          : undefined,
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
    plugins: [
      react(),
      removeConsole(),
      VitePluginHtmlEnv(),
      nodePolyfills({
        exclude: ['fs'],
        globals: {
          Buffer: true, // can also be 'build', 'dev', or false
          global: true,
          process: true,
        },
        // Whether to polyfill `node:` protocol imports.
        protocolImports: true,
      }),
      svgrPlugin({
        svgrOptions: {
          icon: true,
        },
      }),
      VitePluginFonts({
        custom: {
          display: 'auto',
          families: [
            {
              local: 'Poppins',
              name: 'Poppins',
              src: [
                './src/assets/fonts/*.ttf',
                './src/assets/fonts/*.woff',
                './src/assets/fonts/*.woff2',
                './src/assets/fonts/*.eot',
                './src/assets/fonts/*.svg',
              ],
            },
          ],
          injectTo: 'head-prepend',
          prefetch: false,
          preload: true,
        },
      }),
      ViteMinifyPlugin({}),
      splitVendorChunkPlugin(),
      viteCompression(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: true,
      port: 3000,
    },
    assetsInclude: ['**/*.xlsx'],
  });
};
