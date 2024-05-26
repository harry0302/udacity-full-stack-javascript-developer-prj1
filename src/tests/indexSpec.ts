import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('API Endpoint Tests', () => {
  describe('Root Endpoint', () => {
    it('should return 200 status code for the root endpoint', async () => {
      const response = await request.get('/');
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('Non-Existent Routes', () => {
    it('should return 404 status code with the message "404 Not Found" for non-existent routes', async () => {
      const response = await request.get('/abc');
      expect(response.statusCode).toBe(404);
    });
  });

  describe('Image Processing Endpoint', () => {
    const endpoint = '/api/images';

    it('should return 400 status code with the message "Width & height cannot be empty." when width or height param is missing', async () => {
      const response = await request.get(`${endpoint}?filename=myphoto`);
      expect(response.statusCode).toBe(400);
      expect(response.text).toBe('Width & height cannot be empty.');
    });

    it('should return 400 status code with the message "Width and height must be positive numbers." when width or height params are invalid', async () => {
      const response = await request.get(
        `${endpoint}?filename=myphoto&width=-100&height=200`
      );
      expect(response.statusCode).toBe(400);
      expect(response.text).toBe('Width & height must be positive number.');
    });

    it('should return 400 status code with the message "Filename cannot be empty." when filename param is missing', async () => {
      const response = await request.get(
        `${endpoint}?filename=&width=200&height=200`
      );
      expect(response.statusCode).toBe(400);
      expect(response.text).toBe('Filename cannot be empty.');
    });

    it('should return 400 status code with the message "Filename does not exist." when image is not found', async () => {
      const response = await request.get(
        `${endpoint}?filename=nonexistent&width=200&height=200`
      );
      expect(response.statusCode).toBe(400);
      expect(response.text).toBe('Filename does not exist.');
    });

    it('should resize the fjord image and return 201 status code', async () => {
      const response = await request.get(
        `${endpoint}?filename=fjord&width=200&height=200`
      );
      expect(response.statusCode).toBe(201);
    });

    it('should return 200 status code when the fjord image is retrieved from cache', async () => {
      const response = await request.get(
        `${endpoint}?filename=fjord&width=200&height=200`
      );
      expect(response.statusCode).toBe(200);
    });
  });
});
