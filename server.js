const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

//App shouldComponentUpdate
app.use(morgan('combined'));

//app.use(express.static(__dirname));

app.get('*', (req, res) => {
       res.send('OK');
    //res.sendFile(path.resolve(__dirname, 'src/index.js'));
});

//Server Setup
app.listen(port);
console.log("Server listening on: 3000");
