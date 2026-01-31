import { program } from 'npm:commander@^14.0'
import { DirPath, Path } from 'jsr:@leawind/inventory@^0.17.2/fs'

program
  .name('index')
  .description('Generate or check index files')
  .argument('<dir>', 'Directory to generate index files for')
  .option('-c, --check', 'Only check if index files are good', false)
  .option('-f, --force', 'Always write file (if `-c --check` is not set)', false)
  .action(async (dir: string, options) => {
    await index(await Path.dir(dir), options)
  })
  .parse([Deno.execPath(), ...Deno.args])

async function index(path: Path, options: { check: boolean; force: boolean }) {
  const dir = await path.asDir()

  const index_ts = await dir.join('index.ts').asFile(false)
  // console.log(`Index file: ${index_ts}`)

  const lines: string[] = []
  const subdirs: DirPath[] = []

  for (const child of await dir.list()) {
    if (/(^index\.)|(\.test\.ts)/.test(child.name)) {
      continue
    }
    await child.match({
      file(child) {
        lines.push(`export * from './${child.name}'`)
      },
      async dir(child) {
        if ((await child.list()).length > 0) {
          subdirs.push(child)
          lines.push(`export * from './${child.name}/index.ts'`)
        }
      },
    })
  }

  const oldContent = await index_ts.isFile() ? await index_ts.readText() : ''

  if (oldContent.replace(/export \* from '.\/[^']+\.ts';?/g, '').trim() == '') {
    lines.sort()
    // lines.forEach((li) => console.log(`  ` + li))
    const content = lines.join('\n') + '\n'

    const isGood = content.trim() === oldContent.trim()
    if (options.check) {
      if (isGood) {
        console.log(`Good: ${index_ts}`)
      } else {
        console.error(`Index is not good: ${index_ts.path}`)
        Deno.exit(1)
      }
    } else {
      if (options.force || !isGood) {
        console.log(`Writing: ${index_ts.path}`)
        await index_ts.write(content)
      } else {
        console.log(`Skip good: ${index_ts.path}`)
      }
    }
  } else {
    console.log(`Skip: ${index_ts.path}`)
  }

  for (const subdir of subdirs) {
    await index(subdir, options)
  }
}
