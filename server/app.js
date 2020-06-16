var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose');

var session = require('express-session');
var FileStore = require('session-file-store')(session);

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var dynamicRouter = require('./routes/dynamic');
var uploaderRouter=require('./routes/upload');
var collectionRouter=require('./routes/collection');
var likeRouter=require('./routes/like')
var commentRouter=require('./routes/comment')


var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.all('*',function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//   if (req.method == 'OPTIONS') {
//       res.send(200);
//   }else {
//       next();
//   }
// });

let identityKey = 'hichatkey';
app.use(session({
    name: identityKey,
    secret: 'hichat', // 用来对session id相关的cookie进行签名
    store: new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
    resave: false, // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 2 * 3600 * 1000 // 有效期，单位是毫秒
    }
}));

app.use(function(req, res, next){
  console.log(req.url)
  let url = req.url;
  if(req.session.userinfo){
    next()
  }else{
    if(url === '/user/register' || url === '/user/login' || url ==='/user/logout'){
      next();
    }else{
    console.log('intercept:用户未登录执行拦截');
    res.status(401);
    res.end()
    }
  }
})

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/dynamics', dynamicRouter);
app.use('/upload', uploaderRouter);
app.use('/collection', collectionRouter);
app.use('/api/like', likeRouter);
app.use('/comment', commentRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

let connection=mongoose.connection;
mongoose.connect("mongodb://localhost/hichat_db",{
  useNewUrlParser:true,
  useUnifiedTopology:true,
});
connection.on('connected',()=>{
  console.log("MongoDb connected")
})
connection.on('err',(err)=>{
  console.log("MongoDB connection Error",err.message);
})

console.log("http://127.0.0.1:3000")
module.exports = app;
