# Introduction
[![NPM version](https://img.shields.io/npm/v/string-checker.svg?style=for-the-badge)](https://www.npmjs.com/package/string-checker)
[![Downloads](https://img.shields.io/npm/dm/string-checker.svg?style=for-the-badge)](https://www.npmjs.com/package/string-checker)
[![Licence](https://img.shields.io/npm/l/string-checker.svg?style=for-the-badge)](https://www.npmjs.com/package/string-checker)

This is a node application designed to be integrated in a build chain to check for specified strings that you don't want
in your releases or repos.

Example usage is to check for `console.log()`.

By default it will warn, bu this can be changed to error using the `-e`
flag.

__This is very much in beta at the minute, with no unit testing. If you use, please test before relying on it in your
build chain.__

# Installation
`npm install string-checker --D`

#### Running in the command line
`string-checker -d ./src -s console.log console.error -x src/tooling/logger.ts -e`

This will search the `./src` directory for any instances of `console.log` or `console.error`. `logger.ts` has been
added to the exclusion list, so won't cause and error in this instance (`-e`).

#### Add a script to package.json
Add an entry to the `scripts` section of `package.json`

`"check:console": "string-ckecker -d ./src -s console.log -e"`

# Limitations
- When setting up new scripts you might find that your excluded files are generating errors / warnings,
if this does happen copy the file path in the error / warning and use that in the `-x` option. an example of this is
`-x ./src/tooling/logger.ts`, where the error / warning might output `src/tooling/logger.ts`. At the minute there is a
simple text match to determine if the file being tested is in the exclusion list and an exact match is required. - 
_This will be improved in the future, for now a little testing will ensure that you are excluding things correctly._

- None of the options support glob patterns. - _This will be added in the future_

- Exclusions are files only, you cannot specify a directory. - _This should be taken care of by globbing_

- Only one entry point directory can be specified, run once for each directory.

- If there are string matches in the excluded files, the exclusion will always be logged. - _This may be optional in the
future_

# Options
Options:

| Long | Short | Description | Type | Default | Required |
|------|-------|-------------|------|---------|----------|
| --version | | Show version number| | |  |
| --dir| -d | Specifies the root directory for file search | [string] | | Y
| --searchString | -s | Text to search for | [array] [String] | |Y|
| --exclusions| -x | Files that are excluded from the search | [array] [String] | | N |
| --error | -e | returns an error rather than a warning | [boolean] | false | N |
| --console | -c | output results to console | [boolean] | true | N |
| --help | -h | Show help | | | |
