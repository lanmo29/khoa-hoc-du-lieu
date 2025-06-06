var UserTag = require('../models').UserTag;

exports.create = (req, res) => {
    UserTag.create(req.body).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findAll = (req, res) => {
    UserTag.findAll().then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findOne = (req, res) => {
    UserTag.findOne({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.delete = (req, res) => {
    UserTag.destroy({ where: { userId: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.update = (req, res) => {
    UserTag.update(req.body, { where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}