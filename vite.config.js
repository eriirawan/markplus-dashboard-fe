import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import { VitePluginFonts } from 'vite-plugin-fonts';
import svgrPlugin from 'vite-plugin-svgr';
import VitePluginHtmlEnv from 'vite-plugin-html-env';
import removeConsole from 'vite-plugin-remove-console';
import viteCompression from 'vite-plugin-compression';
import vsharp from 'vite-plugin-vsharp';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import terser from '@rollup/plugin-terser';
import { obfuscate } from 'javascript-obfuscator';
import cssnano from 'cssnano';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default ({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
  return defineConfig({
    base: '/',
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
        // Enable esbuild polyfill plugins
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
          }),
        ],
      },
    },
    build: {
      rollupOptions: {
        output: {
          format: 'es',
          plugins: [
            {
              name: 'obfuscate',
              async transform(code, id) {
                if (id.endsWith('.js')) {
                  const obfuscatedCode = await obfuscate(code, {
                    controlFlowFlattening: true,
                    deadCodeInjection: true,
                    identifierNamesGenerator: 'mangled',
                    renameGlobals: true,
                    seed: 'random_seed',
                    stringArray: true,
                    stringArrayEncoding: ['base64'],
                    transformObjectKeys: true,
                    transformObjectValues: true,
                  });
                  return {
                    code: obfuscatedCode,
                    map: null,
                  };
                }
                if (id.endsWith('.css')) {
                  const minifiedCode = await cssnano.process(code);
                  return {
                    code: minifiedCode.css,
                    map: null,
                  };
                }
                return null;
              },
            },
          ],
        },
        plugins: [terser()],
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
      vsharp(),
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
    test: {
      outputFile: 'sonar-report.xml',
      reporters: 'vitest-sonar-reporter',
    },
    assetsInclude: ['**/*.xlsx'],
  });
};
