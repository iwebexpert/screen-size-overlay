import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import preserveDirectives from 'rollup-preserve-directives'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
// import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin({
      cssAssetsFilterFunction: function (outputAsset) {
        return outputAsset.fileName === 'screen-size-overlay.css'
      },
      topExecutionPriority: false,
    }),
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.build.json',
      exclude: ['**/*.test.{ts,tsx}', '**/*.stories.{ts,tsx}'],
    }),
    // visualizer({
    //   filename: './dist/stats.html',
    //   open: true,
    // }),
  ],
  esbuild: {
    legalComments: 'none',
    pure: ['console.log'],
    // treeShaking: true,
    // minifyIdentifiers: true,
    // minifySyntax: true,
    // minifyWhitespace: true,
    // sourcemap: false,
  },
  build: {
    minify: 'esbuild',
    emptyOutDir: true,
    cssCodeSplit: false,
    copyPublicDir: false,
    sourcemap: false,
    lib: {
      entry: 'src/index.ts',
      name: 'ScreenSizeOverlay',
      formats: ['es', 'umd'],
      fileName: (format) => `screen-size-overlay.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      plugins: [preserveDirectives()],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
})
