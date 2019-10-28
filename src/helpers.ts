import { options } from './options';

export const fileExcluded = (file: string): boolean => {
  if (!options.exclusions) {
    return false;
  }

  return options.exclusions.includes(file);
};
