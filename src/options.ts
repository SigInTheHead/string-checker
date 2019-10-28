import { IOptions } from './interface';
import { argv } from './yargs.config';

export const options: IOptions = {
  console: argv.console,
  dir: argv.dir,
  exclusions: argv.exclusions,
  searchStrings: argv.searchString,
  showError: argv.error
};
