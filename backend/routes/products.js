const express = require('express');
const ProductController = require('../controllers/ProductController');
const { body } = require('express-validator');
const handleErrorMessage = require('../middleware/handleErrorMessage');
const upload = require('../helpers/upload');

const router = express.Router();

router.get('',ProductController.index);

router.get('/search', ProductController.search);

router.get('/:id/comments', ProductController.getCommentByProduct)

router.post('', [
    body('name').notEmpty(),
    body('description').notEmpty(),
    body('price').notEmpty(),
    body('categories').notEmpty().isArray({ min : 2 })
],handleErrorMessage,ProductController.store);

router.get('/:id', ProductController.show);

router.post('/:id/upload', [
    upload.single('photo'),
    body('photo').custom((value, {req}) => {
        if(!req.file) {
            throw new Error('Photo is required');
        }
        if(!req.file.mimetype.startsWith('image')) {
            throw new Error('Photo must be image');
        }
        return true;
    }),
], handleErrorMessage, ProductController.upload);

router.delete('/:id', ProductController.destroy);

router.patch('/:id', ProductController.update);

module.exports = router;