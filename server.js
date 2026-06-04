const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes/api'));

/*
app.get('/', (req, res) => {
    res.send('Merhaba Express!');
});
*/
app.listen(PORT, () => {
    console.log(`Server çalışıyor: http://localhost:${PORT}`);
});