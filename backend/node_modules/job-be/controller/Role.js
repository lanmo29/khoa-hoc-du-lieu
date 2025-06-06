var Role = require('../models').Role;

exports.create = (req, res) => {
    Role.create(req.body).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findAll = (req, res) => {
    Role.findAndCountAll().then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findOne = (req, res) => {
    Role.findOne({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.delete = (req, res) => {
    Role.destroy({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.update = (req, res) => {
    Role.update(req.body, { where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}