const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const userRouter = require('./routes/api/users');
const todoRouter = require('./routes/api/todos');
const app = express();
//mongo key in config file
const dbURI = require('./configs/keys').mongoURI;

//connect databse 

mongoose
.connect(dbURI, { 
    useNewUrlParser : true ,
    useFindAndModify: false ,
    useUnifiedTopology: true 
})
.then( () => console.log('Database successfully connected ^_^'))
.catch( err => console.log(err));

//middleware
app.use(express.urlencoded({ extended : false }));
app.use(express.json());
app.use(passport.initialize());
require('./configs/passport')(passport);

//Router middleware
app.use('/users', userRouter);
app.use('/', todoRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));