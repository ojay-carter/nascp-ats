
const mysql = require('mysql')
const fs = require('fs');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');
const {connection, pool} = require('../config/config')
const dayte = new Date(Date.now());
const crypto = require("crypto");
const rand = crypto.randomBytes(12).toString("base64");
const ws = fs.createWriteStream("download.csv")
const fastcsv = require('fast-csv')


module.exports = {

    index: (req, res) => {
        const user = req.session.user   
            pool.getConnection((err, conn) => {
                if (!err){
                    conn.query('SELECT * FROM applications', (err, application)=> {
                         const allApplications = application.length;
                         const adverts = 10;
                   res.render('admin/index', {allApplications, adverts});
                    })
                }
        })   
    },

    register: (req, res) => {
        if(req.session.role == 'editor'){
            res.render('admin/index');
        }else{
            const userRole = 'Admin';
            res.render('admin/register', {userRole});
        }
    },

    registerPost: (req, res) => {
        const errors = [];
        if (!req.body.firstName){
            errors.push({message: 'First name is mandatory'});
        }
        if (!req.body.lastName){
            errors.push({message: 'Last name is mandatory'});
        }
        if (!req.body.email){
            errors.push({message: 'Email is mandatory'});
        }
        if (req.body.password !== req.body.comfirmPassword){
            errors.push({message: 'Passwords do not match'});
        }

        if (errors.length > 0) {
            res.render('admin/register', {
                errors: errors,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });
        } else {
            pool.getConnection((err, connection) =>{
                if (err) throw err;
                connection.query('SELECT email FROM users WHERE email =?', [req.params.email], (err, user) => {
                    connection.release()
                    if (err){
                    res.send('/login');
                    }else{
                        const newUser = {
                            first_name: req.body.firstName,
                            last_name: req.body.lastName,
                            email: req.body.email,
                            password: req.body.password,
                            role: req.body.role
                        };                            
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                newUser.password = hash;

                                connection.query('INSERT INTO users SET?', newUser, (err, saved) =>{
                                    if (!err){
                                        res.redirect('/auth')
                                    }else{
                                        throw err;
                                    }
                                })
                            });
                        });
                    }
                })
            })
                

        }
           
    },


    login: (req, res) => {
        res.render('admin/login');

    },




    viewApplications: (req, res) => {
        pool.getConnection((err, connection) => {
            if(err) throw err;
            const positionID = req.params.id;
            req.session.position = positionID;
            const user = req.session.user;
            connection.query('SELECT * FROM applications WHERE position_id =? ORDER BY time_submited DESC', positionID, (err, applications) => {
                connection.release();
                if (!err){
                    if (applications.length >= 1){
                        
                    const title= applications[0].position;
                    res.render('admin/applications', {applications, title, positionID})
                    }else{
                        res.render('admin/applications', {applications, positionID})

                    }
                }
            })
        })
    },

    


    shortlisted: (req, res) => {
        pool.getConnection((err, connection) => {
            if(err) throw err;
            const positionID = req.params.id;
            
            const title = "Active";
            const status = "Shortlisted";
            const user = req.session.user;
            connection.query('SELECT * FROM applications WHERE position_id =? && status =? ORDER BY time_submited DESC', [positionID, status], (err, applications) => {
                connection.release();
                if (!err){
                    res.render('admin/shortlisted', {applications, title, positionID})
                }
            })
        })
    },

    revisits: (req, res) => {
        pool.getConnection((err, connection) => {
            if(err) throw err;
            const positionID = req.params.id;
            
            const title = "Active";
            const status = "Revisit";
            const user = req.session.user;
            connection.query('SELECT * FROM applications WHERE position_id =? && status =? ORDER BY time_submited DESC', [positionID, status], (err, applications) => {
                connection.release();
                if (!err){
                    res.render('admin/revisits', {applications, title, positionID})
                }
            })
        })
    },

    declined: (req, res) => {
        pool.getConnection((err, connection) => {
            if(err) throw err;
            const positionID = req.params.id;
            
            const title = "Active";
            const status = "Declined";
            const user = req.session.user;
            connection.query('SELECT * FROM applications WHERE position_id =? && status =? ORDER BY time_submited DESC', [positionID, status], (err, applications) => {
                connection.release();
                if (!err){
                    res.render('admin/declined', {applications, title, positionID})
                }
            })
        })
    },

    unreads: (req, res) => {
        pool.getConnection((err, connection) => {
            if(err) throw err;
            const positionID = req.params.id;
            
            const title = "Active";
            const status = "Unread";
            const user = req.session.user;
            connection.query('SELECT * FROM applications WHERE position_id =? && status =? ORDER BY time_submited DESC', [positionID, status], (err, applications) => {
                connection.release();
                if (!err){
                    res.render('admin/unread', {applications, title, positionID})
                }
            })
        })
    },

    allShorlisted: (req, res) => {
        pool.getConnection((err, connection) => {
            if(err) throw err;
            const user = req.session.user;
            const status = 'Shortlisted'
            connection.query('SELECT * FROM applications WHERE status =? ORDER BY time_submited DESC', [ status], (err, applications) => {
                connection.release();
                if (!err){
                    res.render('admin/all-shortlisted', {applications})
                }
            })
        })
    },

    allRevisits: (req, res) => {
        pool.getConnection((err, connection) => {
            if(err) throw err;
            const user = req.session.user;
            const status = 'Revisit'
            connection.query('SELECT * FROM applications WHERE status =? ORDER BY time_submited DESC', [ status], (err, applications) => {
                connection.release();
                if (!err){
                    res.render('admin/all-revisit', {applications})
                }
            })
        })
    },

    allDeclined: (req, res) => {
        pool.getConnection((err, connection) => {
            if(err) throw err;
            const user = req.session.user;
            const status = 'Declined'
            connection.query('SELECT * FROM applications WHERE status =? ORDER BY time_submited DESC', [ status], (err, applications) => {
                connection.release();
                if (!err){
                    res.render('admin/all-unsuccessful', {applications})
                }
            })
        })
    },

    allUnread: (req, res) => {
        pool.getConnection((err, connection) => {
            if(err) throw err;
            const user = req.session.user;
            const status = 'Unread'
            connection.query('SELECT * FROM applications WHERE status =? ORDER BY time_submited DESC', [ status], (err, applications) => {
                connection.release();
                if (!err){
                    res.render('admin/all-unread', {applications})
                }
            })
        })
    },


    activeJobs: (req, res) => {
        const user = req.session.user
        pool.getConnection((err, connection) => {
            if(err) throw err;
            const user = req.session.user;
            const status = 'Active';
            connection.query('SELECT * FROM advert WHERE status =? ORDER BY posted DESC', status, (err, jobs) => {
                connection.release();
                if (!err){
                    res.render('admin/active-jobs', {job: jobs, user})
                }
            })
        })
    },

    inactiveJobs: (req, res) => {
        res.render('admin/inactive-jobs')
    },

    shortlist: (req, res) => {
        const id = req.params.id;
        const position_id = req.session.position;
        const data = {
            status: 'Shortlisted'
        }
         pool.getConnection((err, conn) => {
             if (err) throw err;
             conn.query("UPDATE applications SET? WHERE id = ?", [data, id], (err, candidate) => {
                 conn.release();
                 if (err) throw err;
                 res.redirect(`/admin/applications/${position_id}`)
             })
         })
        
    },

    revisit: (req, res) => {
        const id = req.params.id;
        const position_id = req.session.position;
        const data = {
            status: 'Revisit'
        }
         pool.getConnection((err, conn) => {
             if (err) throw err;
             conn.query("UPDATE applications SET? WHERE id = ?", [data, id], (err, candidate) => {
                 conn.release();
                 if (err) throw err;
                 res.redirect(`/admin/applications/${position_id}`)
             })
         })
        
    },

    decline: (req, res) => {
        const id = req.params.id;
        const position_id = req.session.position;
        const data = {
            status: 'Declined'
        }
         pool.getConnection((err, conn) => {
             if (err) throw err;
             conn.query("UPDATE applications SET? WHERE id = ?", [data, id], (err, candidate) => {
                 conn.release();
                 if (err) throw err;
                 res.redirect(`/admin/applications/${position_id}`)
             })
         })
        
    },


    

    newJob: (req, res) => {
        res.render('admin/new-job');
    },

    postNewJob: (req, res) => {
        const slug = slugify(req.body.position+' '+rand, {
            lower: true
        });

        const newPost = {
            position        : req.body.position,
            status          : 'Active',
            start_date      : req.body.start,
            duration        : req.body.duration,
            deadline        : req.body.deadline,
            location        : req.body.location,
            background       : req.body.background,
            responsibilities      : req.body.responsibility,
            qualification       : req.body.qualification,
            deliverables       : req.body.deliverables,
            renumeration       : req.body.renumeration,
            accountability       : req.body.contract,
            slug            : slug,
            user            : req.session.user
        }


        pool.getConnection((err, connection) => {
            if (err) throw err;

            connection.query('INSERT INTO advert SET ?', newPost, (err, newjob) => {
                connection.release();
                if (!err){
                    res.redirect('active-jobs')
                }else{
                    throw err;
                }
            })
        })

    },

    downloadCSV: (req, res) => {
        pool.getConnection((err, connection) => {
            if(err) throw err;
            const positionID = req.params.id;
            
            const user = req.session.user;
            connection.query('SELECT * FROM applications WHERE position_id =? ORDER BY time_submited DESC', positionID, (err, applications) => {
                connection.release();
                if (!err){
                    const jsonData = JSON.stringify(applications)
                    fastcsv.write(jsonData)
                    console.log('mondy kjhdkjhdbfkjbd good here')
                    .on("finish", function(){
                        console.log('wawu')
                    }).pipe(ws)
                    
                }

        })
        })

            
    },



    editjob: (req, res) => {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(`SELECT * from blogs WHERE id =?`, [req.params.id], (err, blog) => {
                connection.release();
                if (!err){
                    res.render(`admin/edit-career-blog`, {blog : blog[0]});
                }else{
                    throw err;
                }
            })
        })
    },

    deleteBlogPost: (req, res) => {
        pool.getConnection((err, connection) => {
            if (err) throw err;

            connection.query('DELETE from blogs WHERE id =?', [req.params.id], (err, deleted) => {
                connection.release();
                if (!err){
                    res.redirect('/admin/all-blog-posts');
                }else{
                    console.log(err)
                }
            })
        })

    },

    updateBlogPost: (req, res) => {
            
    pool.getConnection((err, connection) => {
        if (err) throw err;

        const slug = slugify(req.body.title+' '+rand, {
            lower: true
        });
        const update = {
            title           : req.body.title,
            status          : req.body.status,
           // blogDescription : req.body.blogDescription,
            highlight       : req.body.highlight,
           // conclusion      : req.body.conclusion,
            seo_keywords    : req.body.seo_keywords,
            seo_description : req.body.seo_description,
            image           : req.body.image,
            slug            : slug
        }
        connection.query(`UPDATE blogs SET ? WHERE id = ?  `, [update, req.params.id], (err, updatedBlog) => {
            connection.release();
            if (!err){
                res.redirect('/admin/all-blog-posts');
            }else{
                console.log(err)
            }
        } )
    })
    },


   


}