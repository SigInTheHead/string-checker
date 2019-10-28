import { fileExcluded } from './helpers';
import { IResultOutput } from './interface';
import { options } from './options';

export const logResults = (results: any, searchString: string): IResultOutput => {
  let error: boolean = false;
  let found: boolean = false;
  let outputMessage: string = '';

  for (const result in results) {
    if (results.hasOwnProperty(result)) {
      const res = results[result];
      const message = `found \x1b[35m"${res.matches[0]}"\x1b[37m ${res.count} times in ${result}`;
      const excluded = fileExcluded(result);

      if (options.showError && !excluded) {
        outputMessage +=`  -\x1b[31m ERROR! \x1b[0m  - ${message}\n`;
        error = true;
        found = true;
      } else if (!options.showError && !excluded) {
        outputMessage +=`  -\x1b[33m WARNING \x1b[0m  - ${message}\n`;
        found = true;
      } else {
        outputMessage +=`  -\x1b[34m Excluded \x1b[0m\x1b[2m - ${message}\x1b[0m\n`;
        found = true;
      }
    }
  }

  if (!found) {
    outputMessage +=`  -\x1b[32m "${searchString}" Not Found!\x1b[0m\n`;
  }

  return {
    error,
    outputMessage
  };
};
