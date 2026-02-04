import { program } from 'npm:commander@^14.0'
import { DirPath, FilePath, Path, PathLike } from 'jsr:@leawind/inventory@^0.17.5/fs'
import log from 'jsr:@leawind/inventory@^0.17.5/log'
import { r } from 'jsr:@leawind/inventory@^0.17.5/tstr'

type CliOptions = {
  check: boolean
  quiet: boolean
  verbose: boolean
}

if (import.meta.main) {
  program
    .name('gen-index')
    .description(`Recursively generates or validates index.ts files in a directory`)
    .argument('<dir>', 'Directory to process index files in')
    .option('-c, --check', 'Validate index files without making changes', false)
    .option('-q, --quiet', 'Suppress all output except errors', false)
    .option('-v, --verbose', 'Enable detailed logging', false)
    .action(async (dir: string, options: CliOptions) => {
      if (options.quiet && options.verbose) {
        log.error('ERROR: --quiet and --verbose options cannot be used simultaneously')
        Deno.exit(1)
      }
      log.api.setLevel(options.verbose ? 'trace' : options.quiet ? 'none' : 'info')

      const outdatedFiles = await genIndex(await Path.dir(dir), {
        check: options.check,
      })

      if (outdatedFiles.length > 0) {
        log.error('FAILURE: The following index files are outdated:')
        outdatedFiles.forEach((file) => log.error('  ' + file))
        Deno.exit(1)
      } else {
        log.info('SUCCESS: All index files are up to date')
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
/**
 * Recursively generates or validates index.ts files in a directory structure.
 *
 * @param path - The root directory to process
 * @param options - Configuration options for the index generation
 * @returns Array of outdated index files (when in check mode)
 */
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

  const indexFile = await dir.join('index.ts').asFile(false)
  log.trace(indent + indexFile)

  const statements: string[] = []
  const outdatedFiles: FilePath[] = []

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
          outdatedFiles.push(...await genIndex(path, Object.assign(opts, { depth: opts.depth + 1 })))
        }
      },
    })
  }

  const content = await indexFile.isFile() ? await indexFile.readText() : ''

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
    log.trace(indent + `${indexFile.path} ...Skipping: Index markers not found`)
    return outdatedFiles
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
    log.trace(`${indexFile.path} ...Updating content:
${newIndexContent}`)
    if (opts.check) {
      log.trace(indent + c(91)`${indexFile.path} ...Outdated`)
      return [...outdatedFiles, indexFile]
    } else {
      await indexFile.write(replaced)
      log.trace(indent + c(92)`${indexFile.path} ...Updated`)
      return []
    }
  }

  log.trace(indent + c(92)`${indexFile.path} ...Up to date`)
  return outdatedFiles

  function c(id: number) {
    return (strs: TemplateStringsArray, ...args: unknown[]): string => {
      return `\x1b[${id}m${r(strs, ...args)}\x1b[0m`
    }
  }
}
