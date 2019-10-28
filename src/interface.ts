export interface IOptions {
  console: boolean;
  dir: string;
  exclusions: Array<string>;
  searchStrings: Array<string>;
  showError: boolean;
}

export interface IResultOutput {
  error: boolean;
  outputMessage: string;
}
