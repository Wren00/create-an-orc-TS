import request from 'supertest';
import { app }  from '../../app';

describe('GET /orcs', () => {
    it('returns 200 and array of orcs', async () => {
        const res = await request(app).get('/orcs');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});