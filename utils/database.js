const async = require('async');
const tables = {
    transactions: `CREATE TABLE transactions (
        TransactionId INT(11) NOT NULL,
        UserId INT(11) NOT NULL,
        CurrencyAmount INT(11) NOT NULL,
        Verifier VARCHAR(40) NOT NULL,
        PRIMARY KEY(TransactionId),
        INDEX(UserId)
    )`
};

exports.recreate = (connection, cb) => {
    async.auto({
        dropTables: (cb) => async.eachLimit(Object.keys(tables), 5, (tableName, cb) => {
            connection.query('DROP TABLE IF EXISTS ' + tableName, cb);
        }, cb),
        recreateTables: ['dropTables', (results, cb) => {
            async.forEachOfLimit(tables, 5, (sql, tableName, cb) => {
                connection.query(sql, (error, results) => {
                    if (error) {
                        console.error(error);
                    }
                    cb(error);
                });
            }, cb);
        }]
    }, cb);
};
