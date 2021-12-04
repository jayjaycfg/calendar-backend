const mongoose = require('mongoose');
const {TEXT} = require('../helpers/text');

const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(TEXT.DATABASE_CONNECTED);
    }catch (err) {
        console.log(err);
        throw new Error(TEXT.CONNECTION_FAIL);
    }
};

module.exports = dbConnection;