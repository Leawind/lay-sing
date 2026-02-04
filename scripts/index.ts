import { program } from 'npm:commander@^14.0'
import { FilePath, Path } from 'jsr:@leawind/inventory@^0.17.4/fs'
import log, { LevelLike } from 'jsr:@leawind/inventory@^0.17.4/log'
import { r } from 'jsr:@leawind/inventory@^0.17.4/tstr'

const RGX_INDEX_EXPORTS = /((^\/\/ Index start >{16}\n)((.*)(^\/\/ <{16}   Index end$)?)?)/ms
const START_LINE = `// Index start >>>>>>>>>>>>>>>>`
const END_LINE = `// <<<<<<<<<<<<<<<<   Index end`

type CliOptions = {
  check: boolean
  quiet: boolean
  verbose: boolean
}

program
  .name('index')
  .description(
    `Generate or check index files.\n\nAdd this line to the index.ts file where the index is generated: \n// Index start >>>>>>>>>>>>>>>>`,
  )
  .argument('<dir>', 'Directory to generate index files for')
  .option('-c, --check', 'Check if index files are good', false)
  .option('-q, --quiet', 'Quiet', false)
  .option('-v, --verbose', 'Verbose', false)
  .action(async (dir: string, options: CliOptions) => {
    if (options.quiet && options.verbose) {
      log.error('ERROR: --quiet and --verbose cannot be used at the same time')
      Deno.exit(1)
    }

    log.api.setLevel(options.verbose ? 'trace' : options.quiet ? 'none' : 'info')

    const dirties = await genIndex(await Path.dir(dir), {
      check: options.check,
    })
    if (dirties.length > 0) {
      log.error('FAIL: There are dirty index files:')
      dirties.forEach((file) => log.error('  ' + file))
      Deno.exit(1)
    } else {
      log.info('PASS: All index files are good')
    }
  })
  .parse([Deno.execPath(), ...Deno.args])

export type Options = {
  depth: number
  check: boolean
}
export async function genIndex(path: Path, options: Partial<Options>): Promise<FilePath[]> {
  const opts = Object.assign({
    depth: 0,
    check: true,
  }, options)

  const IDE = '  '.repeat(opts.depth)
  const dir = await path.asDir()

  const index_ts = await dir.join('index.ts').asFile(false)
  log.trace(IDE + index_ts)

  const statements: string[] = []
  const dirties: FilePath[] = []

  const children = (await dir.list())
    .filter((child) => !/(^index\.ts$)|(.*\.test\.ts$)/.test(child.name))
    .sort((a, b) => a.path.localeCompare(b.path))
  for (const child of children) {
    await child.match({
      file(path) {
        const statement = `export * from './${path.name}'`
        log.trace(IDE + statement)
        statements.push(statement)
      },
      async dir(path) {
        if ((await path.list()).length > 0) {
          const statement = `export * from './${path.name}/index.ts'`
          log.trace(IDE + statement)
          statements.push(statement)
          dirties.push(...await genIndex(path, Object.assign(opts, { depth: opts.depth + 1 })))
        }
      },
    })
  }

  const content = await index_ts.isFile() ? await index_ts.readText() : ''

  if (!RGX_INDEX_EXPORTS.test(content)) {
    log.trace(IDE + `${index_ts.path} ...Skip: Mark not found`)
    return dirties
  }

  const replaced = content
    .replace(RGX_INDEX_EXPORTS, [START_LINE, ...statements, END_LINE].join('\n'))
    .replace(/(?!\n|^)$/m, '\n')
  const isDirty = content.trim() !== replaced.trim()

  if (isDirty) {
    if (opts.check) {
      log.trace(IDE + c(91)`${index_ts.path} ...Dirty`)
      return [...dirties, index_ts]
    } else {
      await index_ts.write(replaced)
      log.trace(IDE + c(92)`${index_ts.path} ...Updated`)
      return []
    }
  }

  log.trace(IDE + c(92)`${index_ts.path} ...Good`)
  return dirties

  function c(id: number) {
    return (strs: TemplateStringsArray, ...args: unknown[]): string => {
      return `\x1b[${id}m${r(strs, ...args)}\x1b[0m`
    }
  }
}
