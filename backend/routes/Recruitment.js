module.exports = app => {
    var Recruitment = require('../controller/Recruitment');
    var router = require('express').Router();

    router.post("/", Recruitment.create);
    router.get('/', Recruitment.findAll);
    router.get('/:id', Recruitment.findOne);
    router.delete('/:id', Recruitment.delete);
    router.patch('/:id', Recruitment.update);

    app.use("/recruitments", router);
}