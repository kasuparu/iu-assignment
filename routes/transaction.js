const response = require('../utils/response');

exports.route = (req, res) => {
    console.log(req.body);
    res.app.get('connection').query(`INSERT INTO transactions(
        TransactionId, UserId, CurrencyAmount, Verifier
    ) VALUES (?)`, [[req.body.TransactionId, req.body.UserId, req.body.CurrencyAmount, req.body.Verifier]], (error, rows) => {
        if (error) {
            console.log(error);
            return response.error(req, res)(error);
        }
        return response.success(req, res)({"Success": true});
  });
};
