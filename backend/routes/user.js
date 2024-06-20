const express = require('express');
const UserController = require('../controllers/UserController');
const User = require('../models/User');
const { body } = require('express-validator');
const handleErrorMessage = require('../middleware/handleErrorMessage');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const upload = require('../helpers/upload');


const router = express.Router();

router.get('/me', AuthMiddleware,UserController.me);

router.post('/login', UserController.login);

router.post('/logout', UserController.logout);

router.post('/register',[
    body('name').notEmpty(),
    body('email').notEmpty(),
    body('email').custom(async value => {
        const user = await User.findOne({ email : value });
        if (user) {
            throw new Error('E-mail already in use');
        }
    }),
    body('password').notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
],handleErrorMessage, UserController.register);

router.post('/:id/upload', [
    upload.single('photo'),
    body('photo').custom((value, {req}) => {
        if(!req.file) {
            throw new Error('Photo is required')
        }
        if(!req.file.mimetype.startsWith('image')) {
            throw new Error('Photo must be image')
        }
        return true;
    })
], handleErrorMessage,UserController.upload);

router.get('/:id/products',AuthMiddleware,UserController.getUserProducts);

router.get('', UserController.index);

router.get('/:id', UserController.show);

router.post('', [
    body('name').notEmpty(),
    body('email').notEmpty(),
    body('email').custom(async value => {
        const user = await User.findOne({ email : value});
        if (user) {
          throw new Error('already in use');
        }
    }),
    body('password').notEmpty()
], handleErrorMessage,UserController.store);

router.patch('/:id', UserController.update);

router.delete('/:id', UserController.destroy);


module.exports = router;