const database = require('../utils/database');
const response = require('../utils/response');

exports.route = (req, res) => {
    database.recreate(res.app.get('connection'), (error, results) => {
        if (error) {
            return response.error(req, res)(error);
        }
        return response.success(req, res)();
    });
};
