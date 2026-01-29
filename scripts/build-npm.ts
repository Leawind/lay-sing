import { build, emptyDir } from 'jsr:@deno/dnt'
import fs from 'jsr:@leawind/inventory@^0.15/fs'

import META from '../deno.json' with { type: 'json' }

const OUTPUT_DIR = fs.p`./dist/npm`

await emptyDir(OUTPUT_DIR)

await build({
  packageManager: 'pnpm',
  importMap: 'deno.json',
  entryPoints: [
    './src/index.ts',
  ],
  outDir: OUTPUT_DIR,
  shims: {
    // deno: true,
    // timers: true,
  },
  esModule: true,
  typeCheck: false,
  test: false,
  declaration: 'inline',
  declarationMap: false,
  scriptModule: false,
  // `package.json` properties
  package: {
    type: 'module',
    name: `lay-sing`,
    version: META.version,
    license: META.license,
    description: '',
    repository: {
      type: 'git',
      url: 'https://github.com/Leawind/lay-sing.git',
    },
    private: false,
    exports: Object.fromEntries(
      Object.entries(META.exports)
        .map(([key, value]) => [
          key,
          value
            .replace(/^\.\/src/, './esm')
            .replace(/\.ts$/, '.js'),
        ]),
    ),
    files: [
      'esm',
    ],
    publishConfig: {
      access: 'public',
    },
  },
  compilerOptions: {
    target: 'ES2023',
    lib: ['ES2023'],
    inlineSources: true,
    sourceMap: true,
    strictFunctionTypes: false,
    noImplicitThis: false,
    noImplicitReturns: false,
    noImplicitAny: false,
  },
})
;[
  'README.md',
  'LICENSE',
].forEach((file) => fs.copyFileSync(fs.p`./${file}`, fs.p`./${OUTPUT_DIR}/${file}`))
