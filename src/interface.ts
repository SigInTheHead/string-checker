export interface IStringChecker {
  dir: string;
  exclusions: Array<string>;
  searchStrings: Array<string>;
  showError: boolean;
}
