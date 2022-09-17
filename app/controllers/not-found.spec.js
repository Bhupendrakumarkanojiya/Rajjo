import request from 'supertest';
import app from '../app';

describe('GET /what/ever', () => {
  it('responds with 404 and JSON object', () => {
    return new Promise(done => {
      return request(app)
        .get('/what/ever')
        .expect(404, {
          error: { message: 'No route found for GET /what/ever', status: 404 },
        })
        .end(done);
    });
  });
});
