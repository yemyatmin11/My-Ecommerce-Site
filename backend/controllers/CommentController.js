const mongoose = require("mongoose");
const Comment = require("../models/Comment");


const CommentController =  {
    index : async (req, res) => {
        try {
            let comments = await Comment.find().sort({createdAt : -1});
            return res.json(comments)
        } catch (e) {
            console.error(e);
            return res.status(500).json({ msg : "internal server error."})
        }
    },
    getCommentByProduct : async (req, res) => {
        try {
            let productId = req.params.id;
            console.log(productId);
            let comments = await Comment
            .find({product : productId})
            .sort({createdAt : -1})
            .populate('user')

            return res.json(comments)

        } catch (e) {
            console.error(e);
            return res.status(500).json({ msg : "internal server error."})
        }
    },
    store : async (req, res) => {
        try {
            let id = req.params.id;
            let { body, user } = req.body;
            
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({msg : 'not a valid id'});
            }
            let commentData = await Comment
            .create({
                body,
                product : id,
                user
            })
            
            if(!commentData) {
                return res.status(404).json({msg : 'Comment not found'})
            }

            return res.json(commentData);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ msg : "internal server error."}) 
        }
    },
    destroy : async (req, res) => {
        try {
            let id = req.params.id;
        
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({msg : 'not a valid id'});
            }

            let comment = await Comment.findByIdAndDelete(id);

            if(!comment) {
                return res.status(404).json({msg : 'Comment not found'})
            }

            return res.json(comment);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ msg : "internal server error."}) 
        }
    },
    update : async (req, res) => {
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg : 'not a valid id'})
            }

            let comment = await Comment.findByIdAndUpdate(id, {
                ...req.body
            })

            if(!comment) {
                return res.status(404).json({ msg : 'Comment not found'})
            }

            return res.status(200).json(comment);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ msg : "internal server error."}) 
        }
    }
}


module.exports = CommentController;