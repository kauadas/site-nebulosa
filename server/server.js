
const express = require('express')


const { dirname } = require('path');
const appDir = dirname(dirname(require.main.filename));

const app = express();

app.use(express.static("front"))

const options = {
    root: appDir
}

app.listen(3000, () => 
console.log('http://localhost:3000/')
);


app.on("request", (file,req) => console.log((file,req)))