const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const {PORT, connection} = require('./config/config');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');
const passport  = require('passport');
const nodemailer = require('nodemailer');
const mysqlStore = require('express-mysql-session');
const sitemap = require('express-sitemap');
const multer = require('multer')


/* Express */
const app = express();
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true, limit: "50mb"}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());




/* MYSQL */
const option = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nascp'
}

const sessionStore = new mysqlStore(option);


/* Flash and Sessions */
app.use(flash());
app.use(session({
    store: sessionStore,
    name: 'userSession',
    secret: 'lahsermania',
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge: 14406666666}
}));


/* Method Override */
app.use(methodOverride('newMethod'));

/* file Uploaad*/
app.use(fileUpload());

/* Handlebars */
app.engine('handlebars', hbs({defaultLayout: 'default'}));
app.set('view engine', 'handlebars');




/* Routes */
const defaultRoutes = require('./routes/defaultRoutes')
app.use('/', defaultRoutes)
const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);
const auth = require('./routes/auth');
app.use('/auth', auth);

app.use('/*', function(req, res) {
    res.status(404).render('default/404')
});

app.listen(PORT, () =>  {
    console.log(`Your Server is running at port ${PORT}`)
})


