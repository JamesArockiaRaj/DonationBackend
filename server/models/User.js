const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    phone: String,
    password: String,
    bloodDonor: Boolean,
    state: String,
    city: String,
    bloodGroup: String
})

const UserModel = new mongoose.model("users",UserSchema)

module.exports = UserModel