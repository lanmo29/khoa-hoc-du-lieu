var Company = require('../models').Company;
var User = require('../models').User;
var Work = require('../models').Work;
var Comment = require('../models').Comment;

require('dotenv').config();
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
const { group } = require('console');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.create = (req, res) => {
  const mail = req.body.email;
  Company.findAll({ where: { email: mail } })
    .then((data) => {
      if (data.length !== 0) {
        res.json({ data: 'email đã tồn tại!' });
      } else {
        User.findAll({ where: { email: mail } }).then((data) => {
          if (data.length !== 0) {
            res.json({ data: 'email đã tồn tại!' });
          } else {
            Company.create(req.body)
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
  var page = req.query.page;
  var status = req.query.status;

  page = parseInt(page);
  let soLuongBoQua = (page - 1) * PAGE_SIZE;
  if (page || status) {
    if (page && !status) {
      Company.findAndCountAll({ offset: soLuongBoQua, limit: PAGE_SIZE })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else if (status && !page) {
      Company.findAndCountAll({ where: { status: status } })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else {
      page = parseInt(page);
      let soLuongBoQua = (page - 1) * PAGE_SIZE;
      Company.findAndCountAll({
        where: { status: status },
        offset: soLuongBoQua,
        limit: PAGE_SIZE,
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    }
  } else {
    Company.findAndCountAll()
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  }
};

exports.search = (req, res) => {
  var page = req.query.page;
  var name = req.query.name;
  var status = req.query.status;

  page = parseInt(page);
  let soLuongBoQua = (page - 1) * PAGE_SIZE;
  if (page || status) {
    if (page && !status) {
      Company.findAndCountAll({
        offset: soLuongBoQua,
        limit: PAGE_SIZE,
        name: { [Op.like]: `%${name}%` },
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else if (status && !page) {
      Company.findAndCountAll({
        where: { status: status, name: { [Op.like]: `%${name}%` } },
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else {
      page = parseInt(page);
      let soLuongBoQua = (page - 1) * PAGE_SIZE;
      Company.findAndCountAll({
        where: { status: status, name: { [Op.like]: `%${name}%` } },
        offset: soLuongBoQua,
        limit: PAGE_SIZE,
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    }
  } else {
    Company.findAndCountAll()
      .then((data) => {
        res.json({ data: data, name: { [Op.like]: `%${name}%` } });
      })
      .catch((er) => {
        throw er;
      });
  }
};

exports.checkAll = (req, res) => {
  var page = req.query.page;
  if (page) {
    page = parseInt(page);
    let soLuongBoQua = (page - 1) * PAGE_SIZE;
    Company.findAndCountAll({
      where: { status: 0 },
      offset: soLuongBoQua,
      limit: PAGE_SIZE,
    })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  } else {
    Company.findAndCountAll({ where: { status: 0 } })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  }
};
exports.findOne = async (req, res) => {
  const companyId = req.params.id;

  try {
    const company = await Company.findOne({
      where: { id: companyId },
      include: [
        {
          model: Comment,
          as: 'comments',
          attributes: []
        }
      ],
      attributes: {
        include: [
          [
            Sequelize.fn("AVG", Sequelize.col("comments.rating")),
            "averageRating"
          ],
          [
            Sequelize.fn("COUNT", Sequelize.col("comments.id")),
            "commentCount"
          ]
        ]
      },
      group: ['company.id'], // Nhóm theo công ty để tính trung bình cho từng công ty
      subQuery: false
    });

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json(company);
  } catch (error) {
    console.error("Error fetching company with avg rating:", error);
    res.status(500).json({ error: 'Error fetching company', details: error.message });
  }
};
exports.findCompanySaveUser = (req, res) => {
  Company.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Work,
        attributes: ['name', 'id'],
        include: [
          {
            model: User,
            attributes: [
              'id',
              'avatar',
              'name',
              'address',
              'phone',
              'male',
              'email',
            ],
          },
        ],
      },
    ],
    attributes: ['name', 'avatar'],
  })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.delete = (req, res) => {
  Company.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.update = (req, res) => {
  Company.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.changePassword = (req, res) => {
  const { password, email } = req.body;
  Company.update({ password }, { where: { email: email } })
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "An error occurred while changing password" });
    });
};
exports.checkEmail = (req, res) => {
  Company.findOne({ where: { email: req.params.email } })
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
