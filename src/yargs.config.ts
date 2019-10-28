import yargs from 'yargs';

export const argv = yargs
  .command('string-checker', 'Checks for given strings in specified directory')
  .option('dir', {
    alias: 'd',
    demandOption: true,
    description: 'specifies the root directory for file search',
    type: 'string',
  })
  .option('searchString', {
    alias: 's',
    array: true,
    demandOption: true,
    description: 'text to search for',
    type: 'string',
  })
  .option('exclusions', {
    alias: 'x',
    array: true,
    description: 'files that are excluded from the search',
    type: 'string',
  })
  .option('error', {
    alias: 'e',
    default: false,
    description: 'returns an error rather than a warning',
    type: 'boolean',
  })
  .option('console', {
    alias: 'c',
    default: true,
    description: 'outputs results to console',
    type: 'boolean'
  })
  .help()
  .alias('help', 'h')
  .argv;
