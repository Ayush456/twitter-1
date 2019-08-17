// modules required 
const express = require('express');
// const queue = require('express-queue');
const app = express();
const bodyParser = require('body-parser');

//  activelimit --> no of request to be process
// app.use(queue({ activeLimit: 1, queuedLimit: -1 }));

// const expressQueue = require('../');
// const queueMw = expressQueue({ activeLimit: 2, queuedLimit: -1 });
// app.use(queueMw);
// console.log(`queueLength: ${queueMw.queue.getLength()}`);

// for body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())

//routes included
const authRoute = require('./routers/authRouter');
const commentRoute = require('./routers/commentRouter');
const tweetRoute = require('./routers/tweetRouter');
const dataRoute = require('./routers/dataRouter');
const userRoute = require('./routers/userRouter');
const searchRoute = require('./routers/searchRouter');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//base routes
app.use('/',authRoute);         
app.use('/comment',commentRoute);    
app.use('/tweet',tweetRoute);
app.use('/data',dataRoute);
app.use('/user',userRoute);
app.use('/search',searchRoute);

//port created
const PORT = process.env.PORT || 5002;
app.listen(PORT,() => {
    console.log(`Server created at port : ${PORT}`);
});

