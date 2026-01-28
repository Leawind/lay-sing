import { build, type Options } from 'tsup';

const tsupConfig: Options = {
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: false,
  clean: true,
  bundle: true,
  target: 'esnext',
} satisfies Options;

await Promise.all([
  build({ outDir: 'dist', format: 'esm', cjsInterop: false, ...tsupConfig }),
  build({ outDir: 'dist', format: 'cjs', dts: true, ...tsupConfig }),
]);
