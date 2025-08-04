import request from 'supertest';
import { app }  from '../../app';

describe('GET /images', () => {
    it('returns 200 and array of 3 images', async () => {
        const res = await request(app).get('/images');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});