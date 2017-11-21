const response = require('../utils/response');

exports.route = (req, res) => {
    res.app.get('connection').query('SELECT UNIX_TIMESTAMP() AS timestamp', (error, rows) => {
        if (error) {
            return response.error(req, res)(error);
        }
        return response.success(req, res)({"Timestamp": rows[0].timestamp});
  });
};
