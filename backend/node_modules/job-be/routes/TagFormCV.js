module.exports = app => {
    var TagFormCV = require('../controller/TagFormCV');
    var router = require('express').Router();

    router.post("/", TagFormCV.create);
    router.get('/', TagFormCV.findAll);
    router.get('/:id', TagFormCV.findOne);
    router.delete('/:id', TagFormCV.delete);
    router.patch('/:id', TagFormCV.update);

    app.use("/tagFormCVs", router);
}