import path from 'path';

const imagesPath = path.join(__dirname, '..', 'images');
const thumbnailPath = path.join(__dirname, '..', 'images', 'thumbnails');

export const getImagePath = (
  imageName: string,
  extension = 'jpg',
  thumbnail = false
): string => {
  const imgPath = thumbnail ? thumbnailPath : imagesPath;
  return path.join(imgPath, `${imageName}.${extension}`);
};

export const generateThumbnailName = (
  filename: string,
  width: number,
  height: number
): string => {
  let thumbnailName = filename;
  if (width) {
    thumbnailName += `_w${width}`;
  }
  if (height) {
    thumbnailName += `_h${height}`;
  }
  return thumbnailName;
};
