const mongoose = require('mongoose')
const password = process.env.MONGODB_PASSWORD;

async function main(){
 await mongoose.connect(`mongodb+srv://anushkashukla3003:${password}@cluster0.bc1d2xs.mongodb.net/classroom`)
} 
module.exports = main;