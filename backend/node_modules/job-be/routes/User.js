module.exports = app => {
    var User = require('../controller/User');
    var router = require('express').Router();

    router.post("/", User.create);
    router.get('/', User.findAll);
    router.get('/:id', User.findOne);
    router.delete('/:id', User.delete);
    router.patch('/:id', User.update);
    router.put('/changePassword', User.changePassword);
    router.get('/checkEmail/:email', User.checkEmail);


    app.use("/users", router);
}