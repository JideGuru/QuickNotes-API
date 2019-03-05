const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res, next)=>{

    User.find({email: req.body.email})
        .exec()
        .then(user=>{
            if(user.length >= 1){
                return res.status(409).json({
                    mesage: `User with email ${req.body.email} exists`
                })
            }else{
                bcrypt.hash(req.body.password, 10, (err, hash)=>{
                    if(err){
                        return res.status(500).json({
                            error: err
                        })
                    }else{
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                        })
                        user
                            .save()
                            .then(result=>{
                                res.status(201).json({
                                    message: "User Created"
                                })
                            })
                            .catch(err=>{
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })
                            });
                    }
                })
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });   
});


router.post('/login', (req,res,next)=>{
    User.find({email: req.body.email})
        .exec()
        .then(user=>{
            if(user.length < 1){
                return res.status(401).json({
                    message: "Auth Failed"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, function(err, result) {
                if(err){
                    return res.status(401).json({
                        message: "Auth Failed"
                    })
                }
                if(result){
                    const token = jwt.sign({
                        email: user[0].email,
                        id: user[0]._id
                    }, 
                    process.env.JWT_KEY, {
                        expiresIn: '1h'
                    }
                    );


                    return res.status(200).json({
                        mesage: "Auth Successful",
                        token: token
                    });
                }
                return res.status(401).json({
                    message: "Auth Failed"
                })
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

router.delete('/:id', (req, res, next)=>{
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
    const id = req.params.id;
    User.remove({_id: id})
        .exec()
        .then(result=>{
            console.log(result);
            res.status(200).json({
                message: "User Deleted",
                // request: {
                //     type: "DELETE",
                //     url: fullUrl
                // }
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
    
});

module.exports = router;