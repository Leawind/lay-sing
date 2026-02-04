import { program } from 'npm:commander@^14.0'
import { DirPath, FilePath, Path, PathLike } from 'jsr:@leawind/inventory@^0.17.5/fs'
import log, { LevelLike } from 'jsr:@leawind/inventory@^0.17.5/log'
import { I, r } from 'jsr:@leawind/inventory@^0.17.5/tstr'

type CliOptions = {
  check: boolean
  quiet: boolean
  verbose: boolean
}

if (import.meta.main) {
  program
    .name('index')
    .description(`Generate or check index.ts recursively in a directory`)
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
}

export type Options = {
  depth: number
  check: boolean
  startLine: string
  endLine: string
  startLinePattern?: RegExp
  endLinePattern?: RegExp
  exportStatement(path: string): string
  fileFilter: (path: FilePath) => boolean
  dirFilter: (path: DirPath) => boolean
}
export async function genIndex(path: PathLike, options: Partial<Options>): Promise<FilePath[]> {
  const opts: Options = Object.assign({
    depth: 0,
    check: true,
    startLine: `// Index start >>>>>>>>>>>>>>>>`,
    endLine: `// <<<<<<<<<<<<<<<<   Index end`,
    startLinePattern: /\/\/ +Index start +>>>>>>>>>>>>>>>>/,
    endLinePattern: /\/\/ +<<<<<<<<<<<<<<<< +Index end/,
    exportStatement: (path: string) => `export * from '${path}'`,
    fileFilter: (path: FilePath) => /.*\.ts$/.test(path.name) && !/(^index\.ts$)|(.*\.test\.ts$)/.test(path.name),
    dirFilter: (path: DirPath) => true,
  }, options)

  const indent = '  '.repeat(opts.depth)
  const dir = await Path.dir(path)

  const index_ts = await dir.join('index.ts').asFile(false)
  log.trace(indent + index_ts)

  const statements: string[] = []
  const dirties: FilePath[] = []

  const children = (await dir.list())
    .filter((path: Path) => path.matchSync({ file: opts.fileFilter, dir: opts.dirFilter }))
    .sort((a, b) => a.path.localeCompare(b.path))
  for (const child of children) {
    await child.match({
      file(path) {
        const statement = opts.exportStatement(`./${path.name}`)
        log.trace(indent + statement)
        statements.push(statement)
      },
      async dir(path) {
        if ((await path.list()).length > 0) {
          const statement = opts.exportStatement(`./${path.name}/index.ts`)
          log.trace(indent + statement)
          statements.push(statement)
          dirties.push(...await genIndex(path, Object.assign(opts, { depth: opts.depth + 1 })))
        }
      },
    })
  }

  const content = await index_ts.isFile() ? await index_ts.readText() : ''

  // Find start and end lines using string or regex matching
  const lines = content.split('\n')

  const matcher: (pattern: string | RegExp) => (line: string) => boolean = (pattern: string | RegExp) => {
    if (pattern instanceof RegExp) {
      return (line: string) => pattern.test(line)
    }
    return (line: string) => line === pattern
  }

  const startIndex = lines.findIndex(matcher(opts.startLinePattern ?? opts.startLine))
  const endIndex = startIndex >= 0
    ? lines.slice(startIndex).findIndex(matcher(opts.endLinePattern ?? opts.endLine))
    : -1

  if (startIndex === -1) {
    log.trace(indent + `${index_ts.path} ...Skip: Mark not found`)
    return dirties
  }

  const newIndexContent = [opts.startLine, ...statements, opts.endLine].join('\n')

  if (endIndex === -1) {
    lines.splice(startIndex, Infinity, newIndexContent)
  } else {
    lines.splice(startIndex, endIndex + 1, newIndexContent)
  }

  let replaced = lines.join('\n')
  if (!replaced.endsWith('\n')) {
    replaced += '\n'
  }

  if (content.trim() !== replaced.trim()) {
    log.trace(`${index_ts.path} ...Replace with:\n${newIndexContent}`)
    if (opts.check) {
      log.trace(indent + c(91)`${index_ts.path} ...Dirty`)
      return [...dirties, index_ts]
    } else {
      await index_ts.write(replaced)
      log.trace(indent + c(92)`${index_ts.path} ...Updated`)
      return []
    }
  }

  log.trace(indent + c(92)`${index_ts.path} ...Good`)
  return dirties

  function c(id: number) {
    return (strs: TemplateStringsArray, ...args: unknown[]): string => {
      return `\x1b[${id}m${r(strs, ...args)}\x1b[0m`
    }
  }
}
