require("dotenv").config();
const express = require("express")
const cors = require('cors');
const fs = require('fs')
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const app = express()
var methodOverride = require("method-override")
const path = require("path")
const con = require("./config/db.js")
const cookieParser = require("cookie-parser")
const http = require('http')

const https = require('https')


const bearerToken = require('express-bearer-token');
app.use(bearerToken());
app.use(cors());

app.use(cookieParser())
app.use(bodyParser.json({limit: '100mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))
// Using pug template engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// connecting route to database
app.use(function(req, res, next) {
  req.con = con
  next()
})
app.use('/.well-known/acme-challenge', express.static('certif'));
app.use('/public', express.static('public'));
// parsing body request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

// include router
const postRouter = require("./routes/postRouter")
const reportPostRouter = require("./routes/reportPostRouter")
const reportCommentRouter = require("./routes/reportCommentRouter")
const userRouter = require("./routes/userRouter")
const indexRouter = require("./routes/indexRouter")
const commentCategoryRouter = require("./routes/commentCategoryRouter")
const commentRouter = require("./routes/commentRouter")
const opinionRouter = require("./routes/opinionRouter")
const postCategoryRouter = require("./routes/postCategoryRouter")
const rateCommentRouter = require("./routes/rateCommentRouter")
const mailRouter = require("./routes/mailRouter")

// routing
app.use("/user", userRouter)
app.use("/post", postRouter)
app.use("/reportpost", reportPostRouter)
app.use("/reportcomment", reportCommentRouter)
app.use("/", indexRouter)
app.use("/commentCategory", commentCategoryRouter)
app.use("/comment", commentRouter)
app.use("/opinion",opinionRouter)
app.use("/postCategory", postCategoryRouter)
app.use("/mail",mailRouter)

app.use("/rateComment", rateCommentRouter)

app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});




https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/thomasfaure.fr/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/thomasfaure.fr/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/thomasfaure.fr/chain.pem')
}, app).listen(443, () => {
  console.log('Listening...')
})
