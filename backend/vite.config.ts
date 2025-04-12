/// <reference types='vitest' />
import { defineConfig } from 'vite';
import { LibraryFormats } from 'vite';

export default defineConfig(({ mode }) => ({
  root: __dirname,
  cacheDir: '../node_modules/.vite/backend',
  server: {
    port: 3000,
    host: true,
    watch: {
      usePolling: true,
    },
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    target: 'node18',
    ssr: true,
    lib: {
      entry: 'src/main.ts',
      formats: ['es' as LibraryFormats],
      fileName: 'main',
    },
    rollupOptions: {
      external: [
        '@nestjs/common',
        '@nestjs/core',
        '@nestjs/platform-express',
        '@nestjs/config',
        'reflect-metadata',
        'fs',
        'path',
        'os',
        'crypto',
        'dotenv',
      ],
    },
  },
  optimizeDeps: {
    exclude: [
      '@nestjs/common',
      '@nestjs/core',
      '@nestjs/platform-express',
      'reflect-metadata',
    ],
  },
  test: {
    watch: false,
    globals: true,
    environment: 'node',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
}));
