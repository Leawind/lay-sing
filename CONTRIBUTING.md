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
  - `main/`: Main entry point, exported to '.'
  - `utils/`: Utility types
- `test/`: Test files, mirroring the source structure

Generated files:

- `dist/npm`: Generated NPM package
- `dist/doc-html`: Generated HTML documentation

## Deno Tasks

The project defines several useful tasks in `deno.json`. You can run them with `deno task <task-name>`:

- `build-npm`: Create an NPM-compatible package
- `index`: Generate barrel files that aggregate exports from each directory (under `src/main`)
- `test`: Run all tests
- `check`: Type check all source files
- `verify`: Verify code quality by running format, lint and tests
- `prepare-jsr`: Prepare for publishing to JSR by verifying everything
- `prepare-npm`: Prepare for publishing to NPM by verifying and building the package
- `prepare`: Combine `prepare-jsr` and `prepare-npm`

## Build Scripts

The project contains specialized scripts in the `scripts/` directory:

### build-npm

Located at `scripts/build-npm.ts`, run with `deno task build-npm`

Creates an NPM-compatible package.

### index

Located at `scripts/gen-index.ts`, run with `deno task index`

Generates barrel files (index.ts) that aggregate exports from each directory. These index files provide a unified module export entry point, allowing external users to import all functionality from a directory through a single path without needing to know the specific file structure.
