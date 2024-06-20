const { default: mongoose } = require('mongoose');
const createToken = require('../helpers/createToken');
const Products = require('../models/Products');
const User = require('../models/User');
const removeFile = require('../helpers/removeFile');



const   UserController = {
    index : async (req, res) => {
        let user = await User.find().sort({createdAt : -1});
        return res.status(200).json(user)
    },
    show : async (req, res) => {
        try {
            let id = req.params.id;
            console.log(id)
            let user = await User.findById(id);
            return res.json(user)
        } catch (e) {
            return res.status(400).json({errors : e.message});
        }
    },
    me : async (req, res) => {
        return res.json(req.user);
    },
    register : async (req,res) => {
        try {
            let { name, email, password } = req.body;
            let user = await User.register(name,email,password);
            let token = createToken(user._id);  
            res.cookie('jwt',token, {httpOnly : true, maxAge : 3 * 24 * 60 * 60 * 1000})
            return res.json({user, token});
        }
        catch(e) {
            return res.status(400).json({errors : e.message});
        }
    },
    login : async (req,res) => {
        try {
            let { email, password } = req.body;
            let user = await User.login(email,password);
            let token = createToken(user._id);  
            res.cookie('jwt',token, {httpOnly : true, maxAge : 3 * 24 * 60 * 60 * 1000})
            return res.json({user, token});
        }
        catch(e) {
            return res.status(400).json({errors : e.message});
        }
    },
    store : async (req, res) => {
        try {
            let { name, email, password } = req.body;
            let user = await User.create({
                name,
                email,
                password
            })
            return res.json(user);
        } catch (e) {
            console.error(e);
            return res.status(400).json({errors : e.message});
        }
    },
    update : async (req, res) => {
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg : 'not a valid id'})
            }

            let user = await User.findByIdAndUpdate(id, {
                ...req.body
            })

            if(!user) {
                return res.status(404).json({ msg : 'User not found'})
            }

            return res.json(user)
        } catch (e) {
            return res.status(400).json({errors : e.message});
        }
    },
    destroy : async (req, res) => {
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg : 'Not a valid id'});
            }

            let user = await User.findByIdAndDelete(id);

            await removeFile(__dirname + '/../public/users' + user.photo);

            if(!user) {
                return res.status(404).json({ msg : 'User not found'});
            }

            return res.json(user);
        } catch (e) {
            return res.status(400).json({errors : e.message});
        }
    },
    getUserProducts : async (req, res) => {
        try {
            let id = req.params.id;
            let products = await Products.find({ user : id });
            return res.status(200).json(products);
        } catch (e) {
            console.error(e);
            return res.status(400).json({errors : e.message});
        }
    },
    upload : async (req, res) => {
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg : 'not a valid id'});
            };

            if(!req.file) {
                return res.status(400).json({ msg : 'No file uploaded'});
            }
    
            let user = await User.findByIdAndUpdate(id, {
                photo : "/" + req.file.filename
            });

    
            if(!user) {
                return res.status(404).json({ msg : 'User not found'})
            };

            if(user.photo) {
                await removeFile(__dirname + '/../public/users' + user.photo);
            };
    
            return res.json(user);
        } catch (e) {
            console.error(e);
            return res.status(400).json({errors : e.message});
        }
    },
    logout : async (req, res) => {
        res.cookie('jwt','', {maxAge : 1});
        return res.json({msg: 'user logged out'})
    }
}

module.exports = UserController;