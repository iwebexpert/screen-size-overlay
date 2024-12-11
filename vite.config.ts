import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import preserveDirectives from 'rollup-preserve-directives'
// import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.build.json',
    }),
    // visualizer({
    //   filename: './dist/stats.html',
    //   open: true,
    // }),
  ],
  esbuild: {
    legalComments: 'none',
    treeShaking: true,
    pure: ['console.log'],
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    sourcemap: true,
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  build: {
    minify: 'esbuild',
    copyPublicDir: false,
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      name: 'ScreenSizeOverlay',
      formats: ['es'],
      fileName: (format) => `screen-size-overlay.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'tailwindcss'],
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
