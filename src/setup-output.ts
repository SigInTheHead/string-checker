import { options } from './options';

export const logTerms = (): string => {
  let output: string = '';

  if (options.searchStrings) {
    output += `string-check - checking \x1b[34m"${options.dir}"\x1b[0m for the following strings\n`;
    options.searchStrings.forEach(searchString => {
      output +=`  - \x1b[32m${searchString}\x1b[0m\n`;
    });
  }

  return output;
};

export const logExclusions = (): string  => {
  let output: string = '';

  if (options.exclusions) {
    output += `string-check - the following files are in the exclusion list\n`;
    options.exclusions.forEach(exclusion => {
      output += `  - \x1b[34m${exclusion}\x1b[0m\n`;
    });
  }

  return output;
};
