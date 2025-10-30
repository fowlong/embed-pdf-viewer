import { resolve } from 'path';
import { defineConfig, Plugin } from 'vite';
import dts from 'vite-plugin-dts';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from '@tailwindcss/postcss';
import fs from 'fs';

// Plugin to process CSS with PostCSS and return as string
function cssToString(): Plugin {
  return {
    name: 'css-to-string',
    enforce: 'pre',
    async load(id) {
      // Only process our specific CSS file with ?raw suffix
      if (id.includes('/styles/index.css?raw')) {
        // Read the actual CSS file (without ?raw)
        const cssPath = id.replace('?raw', '');
        const code = fs.readFileSync(cssPath, 'utf-8');
        
        // Process CSS with PostCSS
        const result = await postcss([autoprefixer(), tailwindcss()]).process(code, { 
          from: cssPath,
          to: undefined
        });
        
        // Return processed CSS as a JavaScript string export
        return {
          code: `export default ${JSON.stringify(result.css)};`,
          map: null
        };
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
  plugins: [cssToString(), dts()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
});
