/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { copyPackageJsonWithVersionHash } from '../../tools/buildable-libs/copy-package-json-with-version-hash';

import libPackageJson from './package.json';
const typedLibPackageJson = libPackageJson as unknown as { peerDependencies?: Record<string, string> }

export default defineConfig({
  cacheDir: '../../node_modules/.vite/buildable-lib',

  plugins: [
    dts({
      entryRoot: 'src',
      tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json'),
      skipDiagnostics: true,
      afterBuild: async () => {
        await copyPackageJsonWithVersionHash('buildable-lib');
      },
    }),
    react(),
    viteTsConfigPaths({
      root: '../../',
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'buildable-lib',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [
        ...Object.keys(typedLibPackageJson.peerDependencies || {}),
        'react',
        'react-dom',
        'react/jsx-runtime',
      ],
    },
  },
});
