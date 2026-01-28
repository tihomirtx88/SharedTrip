const mongoose = require(`mongoose`);
require(`../models/User`);
require(`../models/Trip`);

require('dotenv').config();

const CONNECTION_STRING = process.env.MONGODB_URI || process.env.LOCAL_DB;

module.exports = async () => {
    try {
        await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`Database is connected`);

        mongoose.connection.on('error', (err) => {
            console.error(`Database error`);
            console.error(err);
        });
    } catch (err) {
        console.error(`Error connection on database`);
        console.error(err);
        process.exit(1);
    }
};