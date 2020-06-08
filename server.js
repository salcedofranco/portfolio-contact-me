const express = require('express');
const sendMail = require('./mail');
const log = console.log;
const app = express();
const path = require('path');
require('dotenv').config()

const PORT = 3000;


app.use(express.urlencoded({
    extended:false
}));
app.use(express.json());

app.use(express.static('public'))


//email, subject, text
app.post('/email', (req, res) => {
    //TODO:
    //send email here
    const { subject, email, text } = req.body;
    console.log('Data: ', req.body);

    sendMail(email, subject, text, function(err, data) {
        if (err) {
            res.status(500).json({ message: 'Error'});
        } else {
            res.json({ message: 'Email enviado!'})
        }
    });
    
});



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


app.listen(PORT, () => log('Server is starting on PORT, ',3000));