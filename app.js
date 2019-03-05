const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const notesRoute = require('./api/routes/notes');
const userRoute = require('./api/routes/users');


mongoose.Promise = global.Promise;
console.log(`${process.env.DB_HOST}`)
mongoose.connect(`${process.env.DB_HOST}`, {
    useNewUrlParser: true
});

mongoose.connection
    .once('open', ()=>console.log('Database Connected'))
    .on('error', (err)=>{
        console.log("Error Connecting to Database", err)
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if(req.method === "OPTIONS"){
        res.header(
            'Access-Control-Allow-Methods', 
            'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).json({});
    }
    next();
})

app.use('/notes', notesRoute);
app.use('/user', userRoute);

app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            status: "Something went wrong",
            message: error.message,
            status_code: error.status,
            extra_message: "You can't be here!"
        }
    })
})


module.exports = app;