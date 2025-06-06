module.exports = app => {
    var Tag = require('../controller/Tag');
    var router = require('express').Router();

    router.post("/", Tag.create);
    router.get('/', Tag.findAll);
    router.get('/:id', Tag.findOne);
    router.delete('/:id', Tag.delete);
    router.patch('/:id', Tag.update);
    router.get("/count", Tag.count);
    app.use("/tags", router);
}