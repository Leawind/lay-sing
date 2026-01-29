import { program } from 'npm:commander@^14.0'
import { Path } from 'jsr:@leawind/inventory@^0.17.2/fs'

program
  .name('index')
  .description('Generate or check index files')
  .option('-c, --check', 'Only check if index files are good', false)
  .option('-f, --force', 'Always write file (if `-c --check` is not set)', false)
  .action(async (options) => {
    index(await Path.dir(`src`), true, options)
  })
  .parse([Deno.execPath(), ...Deno.args])

async function index(
  path: Path,
  subdirOnly: boolean,
  options: { check: boolean; force: boolean },
) {
  const dir = await path.asDir()
  const index_ts = await dir.join('index.ts').asFile(false)

  const lines: string[] = []

  for (const child of await dir.list()) {
    if (/(^index\.)|(\.test\.ts)/.test(child.name)) {
      continue
    }
    await child.match({
      file(child) {
        if (!subdirOnly) {
          lines.push(`export * from './${child.name}'`)
        }
      },
      async dir(child) {
        await index(child, false, options)
        lines.push(`export * from './${child.name}/index.ts'`)
      },
    })
  }

  const content = lines.join('\n') + '\n'

  const oldContent = await index_ts.isFile() ? await index_ts.readText() : ''
  const isGood = content.trim() === oldContent.trim()
  if (options.check) {
    if (isGood) {
      console.log(`Good: ${index_ts}`)
    } else {
      console.error(`File is not prepared: ${path}`)
      Deno.exit(1)
    }
  } else {
    if (content.trim() !== oldContent.trim()) {
      console.log(`Write to ${index_ts.path}`)
      lines.forEach((li) => console.log(`  ` + li))
      if (options.force || !isGood) {
        await index_ts.write(content)
      }
    }
  }
}
