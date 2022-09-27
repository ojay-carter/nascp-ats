const mysql = require('mysql');
const {connection, pool} = require('../config/config');
const nodemailer = require('nodemailer');
const fs = require('fs');
const {isEmpty} = require('../config/customFunction')
const fileUpload = require('express-fileupload');
const path = require('path');
const multiparty = require('multiparty');
const { json } = require('body-parser');
const util = require('util');
const crypto = require("crypto");
const rand = crypto.randomBytes(4).toString("base64");




module.exports  = {

    
    index: (req, res) => {
        connection.query('SELECT * FROM advert ORDER BY posted DESC', (err, jobs) => {
        if (!err){
            res.render('default/index', {jobs: jobs})
        }else{
            throw err;
        }
    })
    },

   

    getJobDetails: (req, res) => {
            connection.query('SELECT * FROM advert where slug =?', [req.params.slug], (err, job) => {
                if (!err){
                    res.render('default/jobs/job-details', {job: job[0]});

                }else{
                    throw err;
                }
        });
    },


    submitJobBEFORE: (req, res) => {
        const form = req.body;
        pool.getConnection((err, connection) => {
            if(!err){
                connection.query('INSERT INTO applications SET?', form, (err, saved) => {
                    connection.release();
                    if (!err){
                        console.log('no errors')
                    }else{
                        throw err;
                    }
                   
                    res.status(200).json(saved)
                })
            }

        })
    },

    submitJobxxx: (req, res) => {
        const file = req.files;
        const cover = req.files.cover;
        
        console.log(file)
        res.send('Sweetim')
    
        return;
      
    },


    submitJob: (req, res) => {
                
        let filename = '';
        if(!isEmpty(req.files)){
            let file =req.files.cover;
            filename = rand+'-'+file.name;
            let uploadDir1 = './public/uploads/';
    
            file.mv(uploadDir1+filename, (err) => {
                if (err) 
                    throw err;
            })
        }

        const application = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            tel: req.body.tel,
            status: 'Unread',
            position: req.body.position,
            position_id: req.body.position_id, 
            cv: `/uploads/${filename}`
        }
        
            
       pool.getConnection((err, conn) => {
            if(!err){
                conn.query('INSERT INTO applications SET?', application, (err, saved) => {
                    conn.release();
                    if(!err){
                        res.render('default/jobs/submit-success')
                    }else{
                        throw err
                    }
                })
            }
       })
        

    },


    success: (req, res) => {
        res.render('default/jobs/submit-success')
    },

    employersRegister: (req, res) => {
        const employers = {
            company: req.body.company,
            address: req.body.address,
            company_number: req.body.company_number,
            company_email: req.body.company_email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            mobile_number: req.body.mobile_number,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            
        }
        pool.getConnection((err, connection) => {
            if(!err){
                const params = req.body
                connection.query('INSERT INTO employers SET?', employers, (err, saved) => {
                    connection.release();
                    if (!err){
                        res.send('You have succesffully registered')
                    }else{
                        throw err;
                    }
                })
            }

        })
            
    },
       
     careerBlog: (req, res) => {
        connection.query('SELECT * FROM blogs ORDER BY creationDate DESC', (err, blog) => {
                if (!err){
                    const resultsPerPage = 10;
                    const numOfResults = blog.length;
                    const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
                    let page = req.query.page ? Number(req.query.page) : 1;
                    if (page > numberOfPages){
                        res.redirect('career-blog?page='+encodeURIComponent(numberOfPages))
                    }else if (page < 1){
                        res.redirect('career-blog?page='+encodeURIComponent('1'));
                    }
                    const startingLimit = (page - 1) * resultsPerPage;
                    connection.query(`SELECT * FROM blogs ORDER BY creationDate DESC LIMIT ${startingLimit}, ${resultsPerPage}`, (err, results) => {
                        if (err) throw err;

                        if (page > 1 && page < numberOfPages){
                            const next = page + 1
                            const prev = page - 1;
                            res.render(`default/career-blog`, {blog: results, page,  next, prev, numOfResults})
                    
                        }
                        else if (page < numberOfPages && page <= 1) {
                            const next = page + 1
                            res.render(`default/career-blog` , {blog: results, page, next, numOfResults})   
                        }
                        else if (page > 1 && page >= numberOfPages){
                            const prev = page - 1;
                            res.render(`default/career-blog` , {blog: results, page, prev, numOfResults})   
                        }
                    });
                }else{
                    res.send (err);
                }
            })
     },




}