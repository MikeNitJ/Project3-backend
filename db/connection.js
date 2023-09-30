require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection
    .on('open', () => console.log('u r connected'))
    .on('close', () => console.log('u r not connected'))
    .on('error', (e) => console.log('error yo', e))
module.exports = mongoose