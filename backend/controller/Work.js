var Work = require('../models').Work;
var Company = require('../models').Company;
var Tag = require('../models').Tag;
var TypeOfWork = require('../models').TypeOfWork;
var TagWork = require('../models').TagWork;
var WorkTypeOfWork = require('../models').WorkTypeOfWork;
require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
  Work.create(req.body, {
    include: ['tagWork', 'workType'],
  })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.findAll = (req, res) => {
  var page = req.query.page;
  var status = req.query.status;
  var name = req.query.name;
  var pageSize = req.query.pageSize;
  var typeWordId = req.query.typeWordId || '';
  console.log('typeWordId', typeWordId);
  let PA_SI = parseInt(pageSize) || PAGE_SIZE;

  page = parseInt(page);
  let soLuongBoQua = (page - 1) * PA_SI;
  if (name) {
    Work.findAndCountAll({
      order: [['id', 'DESC']],
      include: [
        { model: Company, where: { name: { [Op.like]: `%${name}%` } } },
      ],
    })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  } else {
    if (page || status) {
      if (page && !status) {
        Work.findAndCountAll({
          order: [['id', 'DESC']],
          offset: soLuongBoQua,
          limit: PA_SI,
          include: [Company],
        })
          .then((data) => {
            res.json({ data: data });
          })
          .catch((er) => {
            throw er;
          });
      } else if (status && !page) {
        Work.findAndCountAll({
          where: { status: status },
          order: [['id', 'DESC']],
          include: [Company],
          subQuery: false,
        })
          .then((data) => {
            res.json({ data: data });
          })
          .catch((er) => {
            throw er;
          });
      } else {
        Work.findAndCountAll({
          where: { status: status },
          order: [['id', 'DESC']],
          offset: soLuongBoQua,
          include: [
            Company,
            {
              model: TypeOfWork,
              where: { id: { [Op.like]: `%${typeWordId}%` } },
            },
          ],
          limit: PA_SI,
          subQuery: false,
        })
          .then((data) => {
            res.json({ data: data });
          })
          .catch((er) => {
            res.json({ data: er });
          });
      }
    } else {
      Work.findAndCountAll({ order: [['id', 'DESC']], include: [Company] })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    }
  }
};
exports.search = (req, res) => {
  var address = req.query.address || '';
  var status = req.query.status || '';
  var name = req.query.name || '';
  var typeWordId = req.query.typeWordId || '';
  var nature = req.query.nature === '0' ? '' : req.query.nature;
  Work.findAndCountAll({
    where: {
      nature: { [Op.like]: `%${nature}%` },
      address: { [Op.like]: `%${address}%` },
      name: { [Op.like]: `%${name}%` },
      status: status,
    },
    order: [['id', 'DESC']],
    attributes: [
      'id',
      'name',
      'address',
      'createdAt',
      'price1',
      'price2',
      'dealtime',
    ],
    include: [
      { model: Company, attributes: ['name', 'id', 'avatar'] },
      { model: TypeOfWork, where: { id: { [Op.like]: `%${typeWordId}%` } } },
    ],
  })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      res.json({ data: er });
    });
};

exports.findAllId = (req, res) => {
  var page = req.query.page;
  var companyId = req.query.id;
  if (page) {
    page = parseInt(page);
    let soLuongBoQua = (page - 1) * PAGE_SIZE;
    Work.findAndCountAll({
      offset: soLuongBoQua,
      limit: PAGE_SIZE,
      include: [Company],
      where: { companyId: companyId, status: 1 },
      order: [['id', 'ASC']],
    })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  } else {
    Work.findAndCountAll({
      include: [Company],
      where: { companyId: companyId, status: 1 },
    })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  }
};

exports.findOne = (req, res) => {
  Work.findOne({
    where: { id: req.params.id },
    include: [Company, TypeOfWork, 'tagWork'],
  })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};

exports.delete = (req, res) => {
  Work.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};

exports.update = (req, res) => {
  Work.update(req.body, {
    where: { id: req.params.id },
    include: ['tagWork', 'workType'],
  })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
