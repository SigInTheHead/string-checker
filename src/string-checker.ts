#!/usr/bin/env node

import yargs from 'yargs';
import { IStringChecker } from './interface';

const findInFiles = require('find-in-files');

const argv = yargs
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
  .help()
  .alias('help', 'h').argv;

const options: IStringChecker = {
  dir: argv.dir,
  exclusions: argv.exclusions,
  searchStrings: argv.searchString,
  showError: argv.error,
};

export const fileExcluded = (file: string): boolean => {
  if (!options.exclusions) {
    return false;
  }

  return options.exclusions.includes(file);
};

const logResults = (results: any, searchString: string) => {
  let error = false;
  let found = false;
  for (const result in results) {
    if (results.hasOwnProperty(result)) {
      const res = results[result];
      const output = `found \x1b[35m"${res.matches[0]}"\x1b[37m ${res.count} times in ${result}`;
      const excluded = fileExcluded(result);

      if (options.showError && !excluded) {
        console.log(' -\x1b[31m ERRROR! \x1b[0m  -', output);
        error = true;
        found = true;
      } else if (!options.showError && !excluded) {
        console.log(' -\x1b[33m WARNING \x1b[0m  -', output);
        found = true;
      } else {
        console.log(' -\x1b[34m Excluded \x1b[0m\x1b[2m -', output, '\x1b[0m');
        found = true;
      }
    }
  }

  if (!found) {
    console.log(` -\x1b[32m "${searchString}" Not Found!\x1b[0m`);
  }

  return error;
};

const logTerms = () => {
  if (options.searchStrings) {
    console.log('string-check - checking for the following strings');
    options.searchStrings.forEach(searchString => {
      console.log('  - \x1b[32m', searchString, '\x1b[0m');
    });
  }
};

const logExclusions = () => {
  if (options.exclusions) {
    console.log('string-check - the following files are in the exclusion list');
    options.exclusions.forEach(exclusion => {
      console.log('  - \x1b[34m', exclusion, '\x1b[0m');
    });
  }
};

const search = async () => {
  const promises: Array<Promise<boolean>> = [];
  options.searchStrings.forEach((searchString: string) => {
    promises.push(
      new Promise(resolve => {
        findInFiles.find(searchString, options.dir).then((results: any) => {
          resolve(logResults(results, searchString));
        });
      }),
    );
  });

  return Promise.all(promises);
};

const init = () => {
  logTerms();
  logExclusions();

  console.log('string-check - results:');
  search().then(x => {
    if (x.includes(true)) {
      process.exit(1);
    }
  });
};

init();
