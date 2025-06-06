const { sendMail } = require('../services/mailService');

var WorkApply = require('../models').WorkApply;
var Company = require('../models').Company;
var Work = require('../models').Work;
var User = require('../models').User;

exports.create = async (req, res) => {
  try {
    // Create WorkApply entries in bulk
    const data = await WorkApply.create(req.body);

    // Extract userId and workId from the first entry of req.body (assuming consistent structure)
    const { userId, workId } = req.body[0];

    // Fetch work and associated company data
    const work = await Work.findByPk(workId, {
      include: [{ model: Company }]
    });

    // Fetch user data
    const user = await User.findByPk(userId);

    if (work && work.Company && user) {
      // Prepare mail data
      const mailData = {
        email: work.Company?.email,
        company: work.Company,  // Company data from Work
        work,                   // Work data
        user                    // User data
      };

      // Send mail
      sendMail(mailData);
    }

    // Respond with created data
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
};
exports.findAll = (req, res) => {
  WorkApply.findAll()
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.findOne = (req, res) => {
  WorkApply.findOne({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.delete = (req, res) => {
  WorkApply.destroy({ where: { userId: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};

exports.update = (req, res) => {
  WorkApply.update(req.body, {
    where: { userId: req.body.userId, workId: req.body.workId },
  })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.checkWorkApply = (req, res) => {
  Company.findOne({
    where: { id: req.params.id },
    attributes: ['name', 'avatar'],
    include: [
      {
        model: Work,
        attributes: ['id', 'name'],
        include: [
          {
            model: User,
            as: 'workapply2',
            attributes: [
              'id',
              'avatar',
              'name',
              'address',
              'phone',
              'male',
              'email',
            ],
            through: { attributes: ['link', 'message', 'sechedule'] },
          },
        ],
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
exports.checkUserApply = (req, res) => {
  User.findOne({
    where: { id: req.params.id },
    attributes: ['id'],
    include: [
      {
        model: Work,
        as: 'workapply',
        attributes: ['id', 'name', 'price1', 'price2', 'address', 'dealtime'],
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
