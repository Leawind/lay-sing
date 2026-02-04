import { program } from 'npm:commander@^14.0'
import { FilePath, Path } from 'jsr:@leawind/inventory@^0.17.4/fs'
import log from 'jsr:@leawind/inventory@^0.17.4/log'
import { r } from 'jsr:@leawind/inventory@^0.17.4/tstr'

const RGX_INDEX_EXPORTS = /((^\/\/ Index start >{16}\n)((.*)(^\/\/ <{16}   Index end$)?)?)/ms
const START_LINE = `// Index start >>>>>>>>>>>>>>>>`
const END_LINE = `// <<<<<<<<<<<<<<<<   Index end`

type Options = {
  check: boolean
  logLevel: string
  quiet: boolean
}
program
  .name('index')
  .description(
    `Generate or check index files.\n\nAdd this line to the index.ts file where the index is generated: \n// Index start >>>>>>>>>>>>>>>>`,
  )
  .argument('<dir>', 'Directory to generate index files for')
  .option('-c, --check', 'Check if index files are good', false)
  .option('-q, --quiet', 'Quiet', false)
  .option('-l, --log-level <level>', 'Log level', 'info')
  .action(async (dir: string, options: Options) => {
    log.api.setLevel(log.api.parseLevel(options.logLevel))
    if (options.quiet) {
      log.api.setLevel('none')
    }
    const dirties = await index(await Path.dir(dir), 0, options)
    if (dirties.length > 0) {
      log.error('FAIL: There are dirty index files:')
      dirties.forEach((file) => log.error('  ' + file))
      Deno.exit(1)
    } else {
      log.info('PASS: All index files are good')
    }
  })
  .parse([Deno.execPath(), ...Deno.args])

async function index(path: Path, depth: number, options: Options): Promise<FilePath[]> {
  const IDE = '  '.repeat(depth)
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
          dirties.push(...await index(path, depth + 1, options))
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
    if (options.check) {
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
