module.exports = app => {
    var Candidate = require('../controller/Candidate');
    var router = require('express').Router();

    router.post("/", Candidate.create);
    router.get('/', Candidate.findAll);
    router.get('/:id', Candidate.findOne);
    router.delete('/:id', Candidate.delete);
    router.patch('/:id', Candidate.update);

    app.use("/candidates", router);
}