// modules required 
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();

//default paths
const publicDirectoryPath = path.join(__dirname, 'public');
<<<<<<< HEAD
const viewsPath = path.join(__dirname, 'views');
const layoutsPath = path.join(__dirname, 'views/layouts');
const authPath = path.join(__dirname,'views/auth');
=======
const viewsPath = path.join(__dirname, '/views');
const layoutsPath = path.join(__dirname, '/views/layouts');
>>>>>>> ef82c4f3d8b6268e58e98a482ea683eb2e9e0de4

//set-up for hbs --> views and view engine
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(layoutsPath);

// for body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes included
const indexRoute = require('./routers/indexRouter');
const twitterRoute = require('./routers/twitterRouter');

//required by express
app.use(express.static(publicDirectoryPath));
app.use(express.static(viewsPath));
app.use(express.static(authPath));

//base routes
<<<<<<< HEAD
app.use('/twitter',indexRoute);       //for login-signin-auth  
app.use('/user',twitterRoute);        //for home-profile-logout-tweet

=======
app.use(['/'],indexRoute); //for login-signin-auth  
app.use('/user',twitterRoute);  //for home-profile-logout-tweet
>>>>>>> ef82c4f3d8b6268e58e98a482ea683eb2e9e0de4

//port created
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server created at port : ${PORT}`);
});
