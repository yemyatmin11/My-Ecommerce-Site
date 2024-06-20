const express = require('express');
const CommentController = require('../controllers/CommentController');


const router = express.Router();

router.get('', CommentController.index);

router.post('/:id', CommentController.store);

router.delete('/:id', CommentController.destroy);

router.patch('/:id', CommentController.update)




module.exports = router;