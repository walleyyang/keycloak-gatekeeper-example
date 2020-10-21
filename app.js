const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/admin', (req, res) => {
    res.send('Admin Section');
});

app.listen(8080, ()=> {
    console.log('Listening on 8080');
});