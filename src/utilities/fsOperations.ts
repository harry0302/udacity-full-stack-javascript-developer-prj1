import { existsSync } from 'fs';
import { mkdir } from 'fs/promises';

export const isFileExist = (filename: string): boolean => {
  return existsSync(filename);
};

export const makeDirIfNotExists = async (path: string): Promise<void> => {
  if (!existsSync(path)) await mkdir(path);
};
