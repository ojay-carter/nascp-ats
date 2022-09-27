const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const passport  = require('passport');
const localStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const mysql = require('mysql')
const {pool} = require('../config/config');

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'auth';

    next();
});

router.get('/',  (req, res) => {
 res.redirect('auth/signin')
});


passport.use(new localStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, (req, email, password, done) => {

    pool.getConnection((err, connection) => {
        if (err){
            console.log(err)
        }else{
            connection.query(`SELECT * FROM users WHERE email = ?`, email, (err, user) => {
                if (err){
                    return done(null, false)
                }
                bcrypt.compare(password, user.password, (err, passwordMatched) => {
                    if(err){
                        return err;
                    }
                    
                    if (!passwordMatched){
                        return done(null, false)
                    }
        
                    return done(null, user)
                });
            })
        }
    })
 
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    pool.getConnection((err, connection) => {
        if (!err){
            connection.query(`SELECT * FROM users WHERE id = ?`, id, (err, user) =>{
                done(err, user)
            } )
        }
    })
});


router.route('/signin')
    .get(auth.signinGet);



router.post('/signin', (req, res) => {
    const email = req.body.email
    const password = req.body.password;

    pool.getConnection((err, connection) => {
        if (!err){
            connection.query(`SELECT * FROM users WHERE email = ?`, email, (err, user) => {
                if (user.length >= 1){
                    var userPassword = user[0].password;
                    bcrypt.compare(password, userPassword, (err, matchedPassword) => {
                        if (matchedPassword === true){
                            req.session.loggedin = true;
                            req.session.user = user[0].first_name + ' ' + user[0].last_name;
                            req.session.email = email;
                            req.session.role = user[0].role;
                            
                            
                            res.redirect('/admin')
                        }else{
                            res.send('Wrong Password')
                        }
                    })
                }else{
                    console.log('No user with this email')
                    res.send('No user with this email')
                }
            })
        }else{
            console.log('no connection')
        }
    })
});


/*
router.post('/signin', 
passport.authenticate('local'), 
(req, res) => {
    if (req.user){
        res.send('/admin')
    }
    else{
        res.redirect('/')
    }
});  




*/
module.exports = router;