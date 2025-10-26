import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  outDir: 'dist',
  clean: true,
  skipNodeModulesBundle: true,
  splitting: true,
  minify: true,
  // Копируем CSS файлы
  publicDir: 'src',
  // Включаем CSS в сборку
  loader: {
    '.css': 'copy',
  },
});
