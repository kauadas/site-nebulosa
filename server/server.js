
const express = require('express')


const { dirname } = require('path');
const appDir = dirname(dirname(require.main.filename));

const app = express();

const drive = require("./drive")
app.use(express.static("front"))

drive.load()

const options = {
    root: appDir
}

app.listen(3000, () => 
console.log('http://localhost:3000/')
);


