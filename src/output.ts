import { options } from './options';

const consoleLog = (message: string): void => {
  console.log(message);
};

export function output(message: string): void {
  if (options.console) {
    consoleLog(message);
  }
}
