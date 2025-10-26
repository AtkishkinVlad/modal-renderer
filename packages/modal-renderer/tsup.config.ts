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
  // Копируем CSS файлы в dist
  onSuccess: async () => {
    const { copyFileSync, existsSync } = await import('fs');
    const { join } = await import('path');

    const cssSource = join('src', 'styles.css');
    const cssDest = join('dist', 'styles.css');

    if (existsSync(cssSource)) {
      copyFileSync(cssSource, cssDest);
      console.log('✅ CSS файл скопирован в dist/styles.css');
    }
  },
});
