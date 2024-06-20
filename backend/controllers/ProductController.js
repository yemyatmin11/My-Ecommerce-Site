const { mongoose } = require("mongoose");
const Products = require("../models/Products");
const removeFile = require("../helpers/removeFile");
const Comment = require("../models/Comment");



const ProductController = {
    index : async (req,res) => {
        let limit = 6;
        let page = parseInt(req.query.page) || 1;

        if(page < 1) {
            page = 1;
        }

        let products = await Products
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({createdAt : -1})
        

        let totalProductsCount = await Products.countDocuments();
        let totalPages = Math.ceil(totalProductsCount / limit);

        let links = {
            nextPage : totalPages == page ? false : true,
            previousPage : page == 1 ? false : true,
            currentPage : page ,
            loopableLinks : []
        }

        for (let index = 0; index < totalPages; index++) {
            let number = index + 1;
            links.loopableLinks.push({number})      
        }
       
        let response = {
            links,
            data : products
        }

        return res.json(response);
    },
    store : async (req,res) => {
        try {
            const { name, description, price, categories} = req.body;
            const product = await Products.create({
                name,
                description,
                price,
                categories
            });
            return res.json(product);
        } catch (e) {
            return res.status(500).json({ msg : 'Internal server error'})
        }       
    },
    show : async (req,res) => {
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({msg : 'not a valid id'});
            }
            let product = await Products.findById(id);
            if(!product) {
                return res.status(404).json({msg : 'product not found'});
            }
            return res.json(product);
        }
        catch(e) {
            return res.status(500).json({msg : 'Internet server error.'});
        }
    },
    getCommentByProduct : async (req, res) => {
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({msg : 'not a valid id'});
            }

            let comments = await Comment
            .find({ product : id})
            .sort({createdAt : -1})
            .populate('user')

            if(!comments) {
                return res.status(404).json({msg : 'comments not found'});
            }
            return res.json(comments);
            
        } catch (e) {
            console.error(e);
            return res.status(500).json({msg : 'Internet server error.'});
        }
    },
    update : async (req,res) => {
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({msg : 'not a valid id'});
            }
            let product = await Products.findByIdAndUpdate(id, {
                ...req.body
            });
    
            if(!product) {
                return res.status(404).json({msg : 'product not found'});
            }
            return res.json(product);
        }
        catch(e) {
            return res.status(500).json({msg : 'Internet server error.'});
        }
    },
    destroy : async (req,res) => {
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({msg : 'not a valid id'});
            }
            let product = await Products.findByIdAndDelete(id);

            await removeFile(__dirname + "/../public/products" + product.photo);

            if(!product) {
                return res.status(404).json({msg : 'product not found'});
            }
            return res.json(product);
        }
        catch(e) {
            return res.status(500).json({msg : 'Internet server error.'});
        }
    },
    search : async (req,res) => {
        const term = req.query.n;
        try {
            let products = await Products.find(
                {
                    name : {
                        $regex : term,
                        $options : 'i'
                    }
                })
            .populate('user', 'name');
            return res.json(products);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ msg : 'Interneal server error'});
        }    
    },
    upload : async (req, res) => {
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({msg : 'not a valid id'});
            }

            if (!req.file) {
                return res.status(400).json({ msg: 'No file uploaded' });
            }

            let product = await Products.findByIdAndUpdate(id, {
                photo : "/" + req.file.filename
            });

            if(!product) {
                return res.status(404).json({msg : 'product not found'});
            };

            if (product.photo) {
                await removeFile(__dirname + "/../public/products" + product.photo);
            }

            return res.json(product);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ msg : 'Interneal server error'});
        }
    }
}

module.exports = ProductController