import { Router, Request, Response } from 'express';
import imagesRouter from './api/images';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.send('try GET /api/images?filename={{}}&weight={{}}&height={{}}');
});

router.use('/api', imagesRouter);

router.use((_req: Request, res: Response) =>
  res.status(404).send('404 Not Found')
);

export default router;
