import request from 'supertest';
import { app }  from '../../app';

describe('GET /users', () => {
    it('returns 200 and array of users', async () => {
        const res = await request(app).get('/users');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});