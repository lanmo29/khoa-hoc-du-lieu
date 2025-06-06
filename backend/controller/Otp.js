const { Otps: Otp } = require('../models');
const MailService = require("../config/transporter");

require('dotenv').config()

const generateRandomOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.createOTP = async (req, res) => {
    const { email } = req.body;
    const otp = generateRandomOTP();

    try {
        // Try to find an existing OTP entry
        let record = await Otp.findOne({
            where: { email }
        });

        if (record) {
            // If record exists, update it
            record.otp = otp;
            record.createdAt = new Date();  // update the timestamp
            await record.save();
        } else {
            // If no record exists, create a new one
            record = await Otp.create({
                email,
                otp,
                createdAt: new Date()
            });
        }

        // Email content
        const textSendMail = `Mã OTP của bạn là: ${otp}`;

        // Send email
        MailService.sendMail({
            from: `TIMVIECLAM <${process.env.MAIL_USER}>`,
            to: email,
            subject: 'Web Việc làm - Mã OTP',
            text: textSendMail,
            html: `<b>${textSendMail}</b>`,
        }, (err) => {
            if (err) {
                return res.status(500).json({
                    message: 'Lỗi khi gửi email',
                    err,
                });
            }
            return res.json({
                message: 'Đã gửi OTP qua email',
                email,
                otp,
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating/updating OTP' });
    }
};


exports.checkOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const record = await Otp.findOne({ where: { email, otp } });

        if (!record) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        const now = new Date();
        const otpCreatedAt = new Date(record.createdAt);
        const timeDifference = (now - otpCreatedAt) / 1000 / 60; // Time difference in minutes

        if (timeDifference > 5) {
            return res.status(400).json({ error: 'OTP has expired' });
        }

        res.json({ message: 'OTP is valid' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while checking OTP' });
    }
};
