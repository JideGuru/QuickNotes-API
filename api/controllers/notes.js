const Note = require("../models/note");
const User = require("../models/user");
const checkAuth = require("../middleware/check-auth");
const mongoose = require("mongoose");


exports.get_all_notes = (req, res, next)=>{
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
    Note.find()
        .populate('user', '_id name email')
        .exec()
        .then(result=>{
            const response = {
                count: result.length,
                notes: result.map(result=>{
                    return{
                        title: result.title,
                        content: result.content,
                        _id: result._id,
                        user: result.user,
                        self:{
                            type: 'GET',
                            url: `${fullUrl}/${result._id}`
                        }
                    }
                    
                }),
                request:{
                    type: 'GET',
                    url: `${fullUrl}`
                }
                
            }
            console.log(result)
            res.status(200).json(response)
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}

exports.post_note= /*checkAuth,*/ (req, res, next)=>{
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl

    User.findById(req.body.user)
        .then(user=>{
            if(!user){
                return res.status(404).json({
                    message: "User not found"
                })
            }
            const note = new Note({
                _id: new mongoose.Types.ObjectId(),
                title: req.body.title,
                content: req.body.content,
                user: req.body.user
            });
            return note
                .save()
        })
        .then(result=>{
            console.log(result);
            res.status(201).json({
                message:"Created Successfully",
                person: result,
                request:{
                    type: 'POST',
                    url: `${fullUrl}`
                }
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}

exports.get_one_user_notes = (req, res, next)=>{

    const id = req.params.id;
    console.log(id)
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
    Note.find({user: id})
        .populate('user', '_id name email')
        .exec()
        .then(result=>{
            const response = {
                count: result.length,
                notes: result.map(result=>{
                    return{
                        title: result.title,
                        content: result.content,
                        _id: result._id,
                        user: result.user,
                        self:{
                            type: 'GET',
                            url: `${fullUrl}/${result._id}`
                        }
                    }
                    
                }),
                request:{
                    type: 'GET',
                    url: `${fullUrl}`
                }
                
            }
            console.log(result)
            res.status(200).json(response)
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}

exports.get_one_note = (req, res, next)=>{
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
    const id = req.params.id;
    Note.findById(id)
        .populate('user', '_id name email')
        .exec()
        .then(result=>{
            console.log(result);
            if(result != null){
                res.status(200).json({
                    message:"Request Successful",
                    note: result,
                    request: {
                        type: "GET",
                        url: fullUrl
                    }
                })
            }else{
                res.status(200).json({
                    message:"Note does not exist or it has been deleted",
                    request: {
                        type: "GET",
                        url: fullUrl
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
    
}

exports.edit_one_note = checkAuth, (req, res, next)=>{
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
    const id = req.params.id;
    // const updateOps = {};
    // for(const ops of req.body){
    //     updateOps[ops.propName] = ops.value
    // }

    const title = req.body.title;
    const content = req.body.content;
    const user = req.body.user;
    Note.update({_id: id}, {title: title, content: content, user: user})
        .exec()
        .then(result=>{
            console.log(result);
            res.status(200).json({
                message: "Edit Sucessful",
                note: {
                    title: title, 
                    content: content, 
                    user: user
                },
                request: {
                    type: "PATCH",
                    url: fullUrl
                }
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
    
}


exports.delete_one_note = checkAuth, (req, res, next)=>{
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
    const id = req.params.id;
    Note.remove({_id: id})
        .exec()
        .then(result=>{
            console.log(result);
            res.status(200).json({
                message: "Delete Sucessful",
                request: {
                    type: "DELETE",
                    url: fullUrl
                }
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
    
}