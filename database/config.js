const mongoose = require("mongoose");
const dbConnection = async () => {

    try{
        await mongoose.connect(process.env.DB_CNN);
        console.log("DB Only");
    }catch(error) {
        console.log(error);
        throw new Error("Error a la hora de iniciar la BD ver logs");
    }
}

module.exports = {
    dbConnection
}
//User:meam_id
//Pasword:D87V3lXkU9kWnpeR