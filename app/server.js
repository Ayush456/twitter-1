// modules required 
const express = require('express');
const queue = require('express-queue');
const path = require('path');
const hbs = require('hbs');
const app = express();
const bodyParser = require('body-parser');

//  activelimit --> no of request to be process
app.use(queue({ activeLimit: 1, queuedLimit: -1 }));

// const expressQueue = require('../');
// const queueMw = expressQueue({ activeLimit: 2, queuedLimit: -1 });
// app.use(queueMw);
// console.log(`queueLength: ${queueMw.queue.getLength()}`);

//default paths
const publicDirectoryPath = path.join(__dirname, 'public');
const viewsPath = path.join(__dirname, 'views');
const layoutsPath = path.join(__dirname, 'views/layouts');
const authPath = path.join(__dirname,'views/auth');

//set-up for hbs --> views and view engine
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(layoutsPath);

// for body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())

//routes included
const indexRoute = require('./routers/indexRouter');
const commentRoute = require('./routers/commentRouter');
const tweetRoute = require('./routers/tweetRouter');
const dataRoute = require('./routers/dataRouter');
const userRoute = require('./routers/userRouter');
const searchRoute = require('./routers/searchRouter');

//required by express
app.use(express.static(publicDirectoryPath));
app.use(express.static(viewsPath));
app.use(express.static(authPath));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//base routes
app.use('/',indexRoute);              //for login-signin-auth  
app.use('/comment',commentRoute);     //search edit feed trend who_to_follow activity
app.use('/tweet',tweetRoute);
app.use('/data',dataRoute);
app.use('/user',userRoute);
app.use('/search',searchRoute);
app.use('/socket',(req,res) => {res.send("sockets")});

//port created
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> {
    console.log(`Server created at port : ${PORT}`);
});

