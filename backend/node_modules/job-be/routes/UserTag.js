module.exports = app => {
    var UserTag = require('../controller/UserTag');
    var router = require('express').Router();

    router.post("/", UserTag.create);
    router.get('/', UserTag.findAll);
    router.get('/:id', UserTag.findOne);
    router.delete('/:id', UserTag.delete);
    router.patch('/:id', UserTag.update);

    app.use("/userTags", router);
}