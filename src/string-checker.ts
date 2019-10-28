import { IResultOutput } from './interface';
import { options } from './options';
import { output } from './output';
import { logResults } from './results-output';
import { logExclusions, logTerms } from './setup-output';

const findInFiles = require('find-in-files');

const search = async (): Promise<Array<IResultOutput>> => {
  const promises: Array<Promise<IResultOutput>> = [];
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

export const stringChecker = (): void => {
  let error: boolean = false;
  let outputMessage: string = '';

  outputMessage += `${logTerms()}\n`;
  outputMessage += `${logExclusions()}\n`;

  outputMessage += `string-check - results:\n`;
  search().then(x => {
    x.forEach((result) => {
      outputMessage += (result.outputMessage);
      if (result.error) {
        error = true;
      }
    });

    output(outputMessage);

    if (error) {
      process.exit(1);
    }
  });
};
