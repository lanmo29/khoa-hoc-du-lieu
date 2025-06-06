module.exports = app => {
    var Otp = require('../controller/Otp');
    var router = require('express').Router();

    router.post("/createOTP", Otp.createOTP);
    router.post('/checkOTP', Otp.checkOTP);

    app.use("/otp", router);
}