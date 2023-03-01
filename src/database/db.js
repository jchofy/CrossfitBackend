const mongoose = require('mongoose');

dbConnection().catch(err=>console.log(error));

async function dbConnection() {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.9a1n9af.mongodb.net/CrossfitApp');

    console.log('Base de datos Conectada');

}
module.exports={
    dbConnection
}