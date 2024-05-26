import { resizeImage } from '../utilities/sharp';
import { isFileExist } from '../utilities/fsOperations';
import { generateThumbnailName, getImagePath } from '../utilities/helpers';

describe('Image Processing Functionalities Test', async () => {
  it('should generate a thumbnail image from the "icelandwaterfall" image and store it in the "thumbnail" directory as "icelandwaterfall_w200_h200.jpg"', async () => {
    const imagePath = getImagePath('icelandwaterfall');
    const thumbnailName = generateThumbnailName('icelandwaterfall', 200, 200);
    expect(thumbnailName).toBe('icelandwaterfall_w200_h200');

    const thumbnailPath = getImagePath(thumbnailName, 'jpg', true);
    await resizeImage(imagePath, thumbnailPath, 200, 200);
    expect(isFileExist(thumbnailPath)).toBe(true);
  });
});
