const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'public');

app.use(express.static('public'));
app.use(express.json());

const romanji = require('./romanji.json');
global.romanji = romanji;

app.get('/', (req, res) => {
    //const {dynamic} = req.params;
    //const {key} = req.query;

    const keys = Object.keys(global.romanji.words);
    const randIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randIndex];

    console.log(global.romanji.words)
    res.render('index', {data: global.romanji.words[randomKey]});
    //res.status(200).json({info: global.romanji.words[randomKey].english});
})

app.get('/:word', (req, res) => {
    const {word} = req.params;
    if(word == '' || !Reflect.ownKeys(global.romanji.words).includes(word)) {res.render('index', {data: global.romanji.words["hello"]})}
    else {res.render('word', { data: global.romanji.words[word] });}
})

app.post('/', (req, res) => {
    const { parcel } = req.body;
    console.log(parcel);
    if (!parcel) {
        return res.status(400).send({status: 'failed'});
    }

    res.status(200).send({status: 'recieved'});
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});