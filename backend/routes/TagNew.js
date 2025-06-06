module.exports = app => {
    var TagNew = require('../controller/TagNew');
    var router = require('express').Router();

    router.post("/", TagNew.create);
    router.get('/', TagNew.findAll);
    router.get('/:id', TagNew.findOne);
    router.delete('/:id', TagNew.delete);
    router.patch('/:id', TagNew.update);

    app.use("/tagNews", router);
}