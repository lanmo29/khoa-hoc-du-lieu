var User = require('../models').User;
var Company = require('../models').Company;
var Role = require('../models').Role;
var Work = require('../models').Work;
var TypeOfWork = require('../models').TypeOfWork;
var Tag = require('../models').Tag;
var UserRole = require('../models').UserRole;
require('dotenv').config();
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
  const mail = req.body.email;
  User.findAll({ where: { email: mail } })
    .then((data) => {
      if (data.length !== 0) {
        res.json({ data: 'email đã tồn tại!' });
      } else {
        Company.findAll({ where: { email: mail } }).then((data) => {
          if (data.length !== 0) {
            res.json({ data: 'email đã tồn tại!' });
          } else {
            User.create(req.body, {
              include: { model: UserRole, as: 'asUserRole' },
            })
              .then((data) => {
                res.json({ data: data });
              })
              .catch((er) => {
                throw er;
              });
          }
        });
      }
    })
    .catch((er) => {
      throw er;
    });
};

exports.findAll = (req, res) => {
  var page1 = req.query.page;
  var status = req.query.status;
  let page = parseInt(page1);
  let limit = parseInt(req.query.limit);
  let soLuongBoQua = (page - 1) * PAGE_SIZE;
  if (page || status) {
    if (page && !status) {
      User.findAndCountAll({
        distinct: true,
        offset: soLuongBoQua,
        limit: limit || PAGE_SIZE,
        include: [{ model: TypeOfWork }, { model: Tag }, { model: Role }],
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else if (status && !page) {
      User.findAndCountAll({
        distinct: true,
        where: { status: status },
        include: [{ model: TypeOfWork }, { model: Tag }, { model: Role }],
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else {
      User.findAndCountAll({
        distinct: true,
        where: { status: status },
        offset: soLuongBoQua,
        limit: limit || PAGE_SIZE,
        include: [{ model: TypeOfWork }, { model: Tag }, { model: Role }],
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    }
  } else {
    User.findAndCountAll({
      distinct: true,
      include: [{ model: TypeOfWork }, { model: Tag }, { model: Role }],
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
  User.findOne({
    where: { id: req.params.id },
    include: [{ model: TypeOfWork }, { model: Tag }],
  })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};

exports.findSaveWork = (req, res) => {
  User.findOne({
    where: { id: req.params.id },
    include: [
      { model: TypeOfWork },
      { model: Tag },
      {
        model: Work,
        attributes: [
          'id',
          'name',
          'companyId',
          'address',
          'dealtime',
          'price1',
          'price2',
        ],
        include: [{ model: Company, attributes: ['name', 'avatar'] }],
      },
    ],
  })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};

exports.delete = (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};

exports.update = (req, res) => {
  User.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};

exports.changePassword = (req, res) => {
  const { password, email } = req.body;
  User.update({ password }, { where: { email: email } })
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "An error occurred while changing password" });
    });
};

exports.checkEmail = (req, res) => {
  User.findOne({ where: { email: req.params.email } })
    .then((data) => {
      if (data) {
        return res.json({ data: true });
      } else {
        return res.status(404).json({ error: "Email not found" });
      }
    })
    .catch((er) => {
      res.status(500).json({ error: "Server error", details: er.message });
    });
};
