const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Static Files
app.use('/', express.static(path.join(__dirname, '/public')));

//Routes
app.use('/products', require('./routes/product'));

app.listen(9898, () =>{
    console.log("The port is listening on http://localhost:9898");
});