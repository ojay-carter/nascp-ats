const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultController');
const passport = require('passport');
const localStrategy = require('passport-local');

router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'default';

    next();

});




passport.use(new localStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({email: email}).then(user => {
        if (!user) {
            return done(null, false)
        }

        bcrypt.compare(password, user.password, (err, passwordMatched) => {
            if(err){
                return errr;
            }
            
            if (!passwordMatched){
                return done(null, false)
            }

            return done(null, user)
        });
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    })
});

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/admin',
    session: false
})  

);

/*
router.post('/signin', (req, res, next) => {
    passport.authenticate('local', function(err, user, info){


        
        if (err) {  return next(err);}
        if (!user){
            res.redirect('/')
        }
        req.logIn(user, function(err){
            if (err){return next(err);}
            return res.send('finally')
        });
})(req, res, next)
});

*/

router.route('/')
    .get(defaultController.index);


router.route('/jobs/submit-success')
    .get(defaultController.success);


router.route('/jobs/:slug')
    .get(defaultController.getJobDetails);


router.route('/jobs/:id')
.post(defaultController.submitJob)


router.get('/sitemap.xml', (req, res) => {
    res.sendFile('/views/default/sitemap.xml', {root: "."})
})





module.exports = router;
    