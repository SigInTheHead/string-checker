# Introduction
This is a node application designed to be integrated in a build chain to check fer certain strings that you don't want
in your release / commit.

Example usage is to test for `console.log()`. By default it will warn, bu this can be changed to error using the `-e`
flag.

This is very much in beta at the minute, with no unit testing. If you use, please test before relying on it in your
build chain 

# Installation
install through npm

`npm install string-checker --save-dev`

#### Update package.json

Add an entry to the `scripts` section of `package.json`

`"check:console": "string-ckeck -d ./src -s console.log -e"`

# Options
Options:

| Long | Short | Description | Type | Default | Required |
|------|-------|-------------|------|---------|----------|
| --version | | Show version number| | |  |
|--dir| -d | Specifies the root directory for file search | [string] | | Y
|--searchString | -s | Text to search for | [array] [String] | |Y|
|--exclusions| -x | Files that are excluded from the search | [array] [String] | | N |
|--error | -e | returns an error rather than a warning | [boolean] | false | N |
|--help | -h | Show help | | | |
