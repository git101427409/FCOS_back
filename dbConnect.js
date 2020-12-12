const mongoose = require('mongoose')
const dbPath = process.env.DB_PATH

mongoose.Promise = global.Promise
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', false)

mongoose.connect(dbPath)

const db = mongoose.connection;
db.on('error', err => {
    console.error(`db connect err: ${err}`);
});
db.once('open', db => {
    console.log('Connected to MongoDB');
});
