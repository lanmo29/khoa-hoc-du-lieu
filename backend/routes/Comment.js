module.exports = (app) => {
    const CommentController = require('../controller/Comment');
    const router = require('express').Router();

    // Create a new comment
    router.post('/', CommentController.create);

    // Update a comment
    router.patch('/:id', CommentController.update);


    // Find comments with pagination
    router.get('/', CommentController.findComments);

    // Delete a comment
    router.delete('/:id', CommentController.delete);

    app.use('/comments', router);
};
