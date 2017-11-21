const request = require('request');
const database = require('../utils/database');

const cleanDb = 'http://localhost:3000/Clear';
const url = 'http://localhost:3000/Transaction';

const transaction1 = {
    'TransactionId': 1,
    'UserId': 2,
    'CurrencyAmount': 3,
    'Verifier': 'fd6b91387c2853ac8467bb4d90eac30897777fc6'
};

describe('/Transaction', () => {
    it('clear the database', (done) => {
        request.post(cleanDb, () => {
            done();
        });
    });

    it('returns status code 200 and a successful response', (done) => {
        const params = {
            uri: url,
            body: transaction1,
            json: true
        };
        request.post(params, (error, response, body) => {
            expect(response.statusCode).toBe(200);
            expect(body.Success).toBe(true);
            done();
        });
    });

    it('returns status code 403 and a response on duplicate transactionId', (done) => {
        const params = {
            uri: url,
            body: transaction1,
            json: true
        };
        request.post(params, (error, response, body) => {
            expect(response.statusCode).toBe(403);
            expect(body.Success).toBe(true);
            done();
        });
    });
});
