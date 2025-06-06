module.exports = app => {
    var UserRole = require('../controller/UserRole');
    var router = require('express').Router();

    router.post("/", UserRole.create);
    router.get('/', UserRole.findAll);
    router.get('/:id', UserRole.findOne);
    router.delete('/:id', UserRole.delete);
    router.patch('/:id', UserRole.update);
    app.use("/userRoles", router);
}