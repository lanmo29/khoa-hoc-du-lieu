module.exports = app => {
    var SocialNetwork = require('../controller/SocialNetwork');
    var router = require('express').Router();

    router.post("/", SocialNetwork.create);
    router.get('/', SocialNetwork.findAll);
    router.get('/:id', SocialNetwork.findOne);
    router.delete('/:id', SocialNetwork.delete);
    router.patch('/:id', SocialNetwork.update);

    app.use("/socialNetworks", router);
}