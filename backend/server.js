const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const config = require('config');
const userRouter = require('./routes/api/users');
const authRouter = require('./routes/api/auth');
const todoRouter = require('./routes/api/todos');

const app = express();
//mongo key in config file
const dbURI = config.get('mongoURI');

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
app.use(cors());
app.use(express.urlencoded({ extended : false }));
app.use(express.json());


//Router middleware
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/todo', todoRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));