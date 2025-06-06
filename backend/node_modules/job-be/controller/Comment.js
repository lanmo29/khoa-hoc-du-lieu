const Comment = require('../models').Comment;
const User = require('../models').User;
const Company = require('../models').Company;
require('dotenv').config();
const PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


exports.create = (req, res) => {
    const { userId, companyId, content, rating } = req.body;

    Comment.count({ where: { userId, companyId } })
        .then((count) => {
            if (count > 1) {  // Thay đổi logic để đúng với giới hạn là 3 comments
                return res.status(403).json({ message: 'You can only post one comments per company.' });
            }

            Comment.create({ userId, companyId, content, rating })
                .then((data) => {
                    res.json({ message: 'Comment created successfully', data });
                })
                .catch((error) => {
                    res.status(500).json({ error: 'Error creating comment', details: error.message });
                });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error checking comment count', details: error.message });
        });
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { userId, content, rating } = req.body;

    Comment.findOne({ where: { id } })
        .then((comment) => {
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            // Check if the logged-in user is the owner of the comment
            // if (comment.userId !== userId) {
            //     return res.status(403).json({ message: 'You are not authorized to edit this comment' });
            // }
            comment.update({ content, rating })
                .then((updatedComment) => {
                    res.json({ message: 'Comment updated successfully', data: updatedComment });
                })
                .catch((error) => {
                    res.status(500).json({ error: 'Error updating comment', details: error.message });
                });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error finding comment', details: error.message });
        });
};



exports.findComments = (req, res) => {
    const companyId = req.params?.companyId || null;  // Kiểm tra xem có `companyId` trong params không
    const page = parseInt(req.query.page || 1);
    const offset = (page - 1) * parseInt(req.query.offset || PAGE_SIZE);

    // Điều kiện nếu `companyId` có thì tìm kiếm theo công ty, nếu không thì tìm tất cả các comment
    const whereCondition = companyId ? { companyId } : {};

    Comment.findAndCountAll({
        where: whereCondition,  // Tìm theo `companyId` nếu có
        offset,
        limit: parseInt(req.query.offset || PAGE_SIZE),
        include: [
            { model: User, as: 'user', attributes: ['name', 'avatar'] },
            ...(companyId ? [{ model: Company, as: 'company', attributes: ['name'] }] : [])  // Nếu có `companyId` thì bao gồm cả thông tin công ty
        ]
    })
        .then((result) => {
            res.json({
                data: result.rows,  // Dữ liệu các bình luận
                total: result.count  // Tổng số bình luận
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ error: err.message });
        });
};
exports.delete = (req, res) => {
    const { id } = req.params;

    Comment.findOne({ where: { id } })
        .then((comment) => {
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            // Check if the logged-in user is the owner of the comment
            // if (comment.userId !== userId) {
            //     return res.status(403).json({ message: 'You are not authorized to delete this comment' });
            // }
            comment.destroy()
                .then(() => {
                    res.json({ message: 'Comment deleted successfully', id });
                })
                .catch((error) => {
                    res.status(500).json({ error: 'Error deleting comment', details: error.message });
                });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error finding comment', details: error.message });
        });
};
