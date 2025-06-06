module.exports = (app) => {
  var Company = require('../controller/Company');
  var router = require('express').Router();

  router.post('/', Company.create);
  router.get('/', Company.findAll);
  router.get('/search', Company.search);
  router.get('/:id', Company.findOne);
  router.delete('/:id', Company.delete);
  router.patch('/:id', Company.update);
  router.put('/changePassword', Company.changePassword);
  router.get('/checkEmail/:email', Company.checkEmail);


  app.use('/companys', router);
};
