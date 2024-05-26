import sharp from 'sharp';
import { makeDirIfNotExists } from './fsOperations';
import path from 'path';

interface ImageDimensions {
  width?: number;
  height?: number;
}

export const resizeImage = async (
  inputName: string,
  outputName: string,
  width: number,
  height: number
): Promise<void> => {
  const dimensions: ImageDimensions = {};
  if (width) dimensions.width = +width;
  if (height) dimensions.height = +height;

  await makeDirIfNotExists(path.dirname(outputName));
  await sharp(inputName).resize(dimensions).toFile(outputName);
};
