module.exports = app => {
    var SaveWork = require('../controller/SaveWork');
    var router = require('express').Router();

    router.post("/", SaveWork.create);
    router.get('/', SaveWork.findAll);
    router.get('/:id', SaveWork.findOne);
    router.patch('/:id', SaveWork.update);

    app.use("/saveWorks", router);
}