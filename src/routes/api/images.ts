import { Request, Response, Router } from 'express';
import { isFileExist } from '../../utilities/fsOperations';
import { generateThumbnailName, getImagePath } from '../../utilities/helpers';
import { resizeImage } from '../../utilities/sharp';

const router = Router();

interface QueryObj {
    filename?: string;
    width?: number;
    height?: number;
}

router.get('/images', async (req: Request, res: Response) => {
    const { filename = '' }: QueryObj = req.query;
    if (!filename) {
        return res.status(400).send('Filename cannot be empty.');
    }

    const { width = NaN, height = NaN }: QueryObj = req.query;
    if (!(width && height)) {
        return res.status(400).send('Width & height cannot be empty.');
    }
    if (!(+width > 0) || !(+height > 0)) {
        return res.status(400).send('Width & height must be positive number.');
    }

    const fileNamePath = getImagePath(filename);
    if (!isFileExist(fileNamePath)) {
        return res.status(400).send('Filename does not exist.');
    }

    const thumbnailPath = getImagePath(generateThumbnailName(filename, width, height), 'jpg', true);
    if (!isFileExist(thumbnailPath)) {
        await resizeImage(fileNamePath, thumbnailPath, width, height);
        return res.status(201).sendFile(thumbnailPath);
    }
    
    return res.status(200).sendFile(thumbnailPath);
});
export default router;