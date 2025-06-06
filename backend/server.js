var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var fs = require('fs');
var https = require('https');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('<h1>Chào tất cả các bạn đến với api jobIt!</h1>');
});
require('./routes/LoginCompany')(app);
require('./routes/LoginUser')(app);
require('./routes/LoginAdmin')(app);
require('./routes/Tag')(app);
require('./routes/Statistical')(app);
require('./routes/SendMail')(app);
require('./routes/Company')(app);
require('./routes/CheckCompany')(app);
require('./routes/Work')(app);
require('./routes/User')(app);
require('./routes/Role')(app);
require('./routes/Contact')(app);
require('./routes/TypeOfWork')(app);
require('./routes/New')(app);
require('./routes/SocialNetwork')(app);
require('./routes/Candidate')(app);
require('./routes/Recruitment')(app);
require('./routes/TagNew')(app);
require('./routes/TagWork')(app);
require('./routes/WorkTypeOfWork')(app);
require('./routes/UserTag')(app);
require('./routes/SaveWork')(app);
require('./routes/WordId')(app);
require('./routes/CheckLogin')(app);
require('./routes/DeleteSaveWork')(app);
require('./routes/UserTypeOfWork')(app);
require('./routes/GetUserSaveWork')(app);
require('./routes/GetCompanySaveUser')(app);
require('./routes/WorkApply')(app);
require('./routes/CheckWorkApply')(app);
require('./routes/CheckUserApply')(app);
require('./routes/FormCV')(app);
require('./routes/TagFormCV')(app);
require('./routes/GetCategoriHome')(app);
require('./routes/SearchWork')(app);
require('./routes/UserRole')(app);
require('./routes/Otp')(app);
require('./routes/Comment')(app);

app.use(function (err, req, res, next) {
  res.status(500).send(err);
});


app.listen(process.env.PORT || 777, () => {
  console.log('Chào mừng bạn đến với Backend');
});


// const server = http.createServer(app);
// var options = {
//   key: fs.readFileSync("./.cert/cert.key"),
//   cert: fs.readFileSync("./.cert/cert.crt"),
// };
// const server = https.createServer(options, app);

// server.listen(process.env.PORT || 777, () => {
//   console.log(`Application is listening on port ${process.env.PORT || 777}`);
// });