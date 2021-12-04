global.config = require('./config.json');
const func = require('./functions')
const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");
var app = express();

app.enable("trust proxy");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

const apiRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 3,
    message: {
        status: 429, 
        message: "Too many requests"
    }
});

app.get('/', (req, res)=>{
    res.render('index.ejs', { config: config });
})

app.post('/send', apiRateLimit, (req, res)=>{
    func.createFile(req.body.data, req, res);
})

app.get('*', (req, res)=>{
    res.render('status', {code: '404', message: "Page not found!"})
})

app.listen(config.port, ()=>{
    console.log(`App started at port ${config.port}`)
});