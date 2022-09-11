const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const db = await mongoose.connect('mongodb+srv://eashwarmp:testing1@cluster0.80blr.mongodb.net/profiles')
        console.log(`Mongoose Connected ------------> ${db.connection.host}`)
    } catch(err) {
        console.log(`Exception Printed --> ${err}`)
    }
}

module.exports = connectDB