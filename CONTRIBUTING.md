# Contribute to [`lay-sing`](https://github.com/Leawind/lay-sing)

## Requirements

### [Deno](https://docs.deno.com/runtime/getting_started/installation/)

Recommended version 2.6.x or higher. Required for any development tasks.

### [Node.js](https://nodejs.org/en/download/)

Required when creating the NPM package. Recommended version 24.x.x or higher.

You don't need it if you don't want to publish to NPM.

## Project Structure

- `scripts/`: Build and development scripts
- `src/`: Source code
  - `main/index.ts`: Main entry point, exported to '.'
  - `*.ts`: Other entry points
- `test/`: Test files

Generated files:

- `dist/npm`: Generated NPM package

## Deno Tasks

The project defines several useful tasks in `deno.json`. You can run them with `deno task <task-name>`:

- `dev`: Run tests in watch mode
- `test`: Run all tests
- `check`: Type check all source files
- `verify`: Verify code quality by running format, lint and tests
- `build-npm`: Create an NPM-compatible package
- `index`: Generate barrel files that aggregate exports from each directory
- `prepare-deno`: Prepare for publishing to JSR by verifying everything
- `prepare-npm`: Prepare for publishing to NPM by verifying and building the package
- `prepare`: Combine `prepare-deno` and `prepare-npm`

## Build Scripts

The project contains specialized scripts in the `scripts/` directory:

### build-npm

Located at `scripts/build-npm.ts`, run with `deno task build-npm`

Creates an NPM-compatible package.

### index

Located at `scripts/index.ts`, run with `deno task index`

Generates barrel files (index.ts) that aggregate exports from each directory

Usage:

```
Usage: index [options]

Generate or check index files

Options:
  -c, --check  Only check if index files are good (default: false)
  -f, --force  Always write file (if `-c --check` is not set) (default: false)
  -h, --help   display help for command
```
