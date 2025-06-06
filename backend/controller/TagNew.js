var TagNew = require('../models').TagNew;

exports.create = (req, res) => {
    TagNew.create(req.body).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findAll = (req, res) => {
    TagNew.findAll().then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findOne = (req, res) => {
    TagNew.findOne({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.delete = (req, res) => {
    TagNew.destroy({ where: { newId: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.update = (req, res) => {
    TagNew.update(req.body, { where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}