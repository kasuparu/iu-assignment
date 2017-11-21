const request = require('request');
const database = require('../utils/database');

const cleanDb = 'http://localhost:3000/Clear';
const url = 'http://localhost:3000/Timestamp';

describe('/Timestamp', () => {
    it('returns status code 200 and a timestamp', (done) => {
        request.get(url, (error, response, body) => {
            expect(response.statusCode).toBe(200);
            const json = JSON.parse(body);
            expect(json.Timestamp).toBeCloseTo(Date.now() / 1000, -1);
            done();
        });
    });
});
