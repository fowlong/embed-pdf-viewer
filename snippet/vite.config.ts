import { resolve, dirname } from 'path';
import { defineConfig, Plugin } from 'vite';
import dts from 'vite-plugin-dts';
import fs from 'fs';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from '@tailwindcss/postcss';

// Plugin to import CSS as a string (for inline styles)
function cssAsString(): Plugin {
  return {
    name: 'css-as-string',
    enforce: 'pre',
    resolveId(id, importer) {
      // Resolve relative CSS imports
      if (id.endsWith('.css') && importer) {
        const resolved = resolve(dirname(importer), id);
        if (resolved.endsWith('/index.css') && resolved.includes('/styles/')) {
          return resolved + '?inline-css';
        }
      }
    },
    async load(id) {
      if (id.endsWith('?inline-css')) {
        const realId = id.replace('?inline-css', '');
        const css = fs.readFileSync(realId, 'utf-8');
        // Process CSS with PostCSS
        const result = await postcss([autoprefixer(), tailwindcss()]).process(css, { from: realId });
        // Return as a JS module
        return {
          code: `export default ${JSON.stringify(result.css)}`,
          map: null
        };
      }
    },
    transform(code, id) {
      // Skip CSS transformation for our inline CSS
      if (id.endsWith('?inline-css')) {
        return null; // Let our load hook handle it
      }
    }
  };
}

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/embedpdf.ts'),
      name: 'EmbedPDF',
      fileName: 'embedpdf',
    },
  },
  plugins: [cssAsString(), dts()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
});
