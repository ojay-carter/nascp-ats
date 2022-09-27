const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {loggedIn} = require('../config/customFunction');


router.all('/*', loggedIn, (req, res, next) => {
    req.app.locals.layout = 'admin';

    next();
});

router.route('/')
    .get(adminController.index);


router.route('/index')
    .get(adminController.index);

router.route('/register')
    .get(adminController.register)
    .post(adminController.registerPost );  



router.get('/logout', (req, res) => {
    req.session.destroy();
   // req.flash('success', 'You have successfully logged out');
    res.redirect('/auth')
})
 


router.route('/applications/:id')
    .get(adminController.viewApplications)



router.route('/active-jobs')
    .get(adminController.activeJobs)

router.route('/inactive-jobs')
    .get(adminController.inactiveJobs)

router.route('/new-job')
    .get(adminController.newJob)
    .post(adminController.postNewJob)

router.route('/applications/shortlist/:id')
    .put(adminController.shortlist);

router.route('/applications/revisit/:id')
    .put(adminController.revisit);

router.route('/applications/decline/:id')
    .put(adminController.decline);

router.route('/applications/:id/download')
    .get(adminController.downloadCSV);

router.route('/applications/:id/shortlisted')
    .get(adminController.shortlisted);

router.route('/applications/:id/revisits')
    .get(adminController.revisits);

router.route('/applications/:id/declined')
    .get(adminController.declined);

router.route('/applications/:id/unread')
    .get(adminController.unreads);

router.route('/all-shortlisted')
    .get(adminController.allShorlisted);

router.route('/all-revisit')
    .get(adminController.allRevisits);

router.route('/all-unsuccessful')
    .get(adminController.allDeclined);

router.route('/all-unread')
    .get(adminController.allUnread);



module.exports = router;