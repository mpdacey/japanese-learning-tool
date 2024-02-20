const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

const romanji = require('./romanji.json');
global.romanji = romanji;

app.get('/info/:dynamic', (req, res) => {
    const {dynamic} = req.params;
    const {key} = req.query;

    const keys = Object.keys(global.romanji.words);
    const randIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randIndex];

    console.log(dynamic, key, global.romanji.words[randomKey])
    res.status(200).json({info: global.romanji.words[randomKey].english});
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