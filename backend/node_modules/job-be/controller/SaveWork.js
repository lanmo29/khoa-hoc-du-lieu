var SaveWork = require('../models').SaveWork;

exports.create = (req, res) => {
    console.log(req.body)
    SaveWork.create(req.body).then(data => {
        res.json({ data: data })
        console.log(data)
    }).catch(er => {
        console.error(er)
        throw er;
    })
}
exports.findAll = (req, res) => {
    SaveWork.findAll({ where: { userId: req.query?.userId || "", workId: req.query.workId } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findOne = (req, res) => {
    SaveWork.findAll(req.body).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.delete = (req, res) => {
    SaveWork.destroy({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.update = (req, res) => {
    SaveWork.update(req.body, { where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}