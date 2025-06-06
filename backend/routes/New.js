module.exports = app => {
    var New = require('../controller/New');
    var router = require('express').Router();

    router.post("/", New.create);
    router.get('/', New.findAll);
    router.get('/:id', New.findOne);
    router.delete('/:id', New.delete);
    router.patch('/:id', New.update);

    app.use("/news", router);
}