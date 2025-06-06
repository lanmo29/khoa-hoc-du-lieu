module.exports = (app) => {
  var WorkApply = require('../controller/WorkApply');
  var router = require('express').Router();

  router.post('/', WorkApply.create);
  router.get('/', WorkApply.findAll);
  router.get('/:id', WorkApply.findOne);
  router.delete('/:id', WorkApply.delete);
  router.patch('/', WorkApply.update);

  app.use('/workApplys', router);
};
