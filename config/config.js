const mysql = require('mysql');
module.exports = {
    PORT: process.env.PORT || 5000,

    connection: mysql.createConnection({
        multipleStatements: true,
        host           : 'localhost',
        user           : 'guardian',
        password       : 'data052gem154',
        database       : 'nascpdb',
    }),

    pool: mysql.createPool({
        connectionLimit: 10,
        host           : 'localhost',
        user           : 'guardian',
        password       : 'data052gem154',
        database       : 'nascpdb',
    }),

    globalVariables: (req, res, next) => {
        res.locals.success_message = req.flash('success-message');
        res.locals.error_message = req.flash('error-message');
        res.locals.user = req.user || null;

        next();
    }
}


	
