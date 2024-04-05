const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/User')
const bycrypt = require('bcrypt')

const app = express()
app.use(express.json())
app.use(cors())

// mongoose.connect("mongodb://localhost:27017/user");

mongoose.connect("mongodb://127.0.0.1:27017/user") 


app.post("/register", (req, res) =>{
    const {username,phone,password} = req.body;
    UserModel.findOne({phone: phone})
    .then(user => {
        if(user){
            res.status(400).json({ message: "User already exists! Try to Login" });
        } else{
            bycrypt.hash(password,10)
            .then(hash =>{
                UserModel.create({username,phone,password: hash,bloodDonor: false})
                .then(users => res.json(users))
                .catch(err=> res.json(err))
            }).catch(err => console.log(err.message))
        }
    })
});

app.post("/login", (req, res) =>{
    const {phone, password} = req.body;
    UserModel.findOne({phone: phone})
    .then(user => {       
        if(user){
            bycrypt.compare(password,user.password, (err,response) => {
                if(err){
                    res.status(200).json("Incorrect Password");
                }
                if(response){
                    res.json(user);
                } else {
                    res.status(200).json("Incorrect Password");
                }
            })
        } else {
            res.status(200).json("User does not exist");
        }
    })
});

app.get("/verifylogin", (req, res) => {
    const userId = req.query.userId; // Assuming you're passing userId as a query parameter
    // Logic to verify userId in your database
    // For example, if using MongoDB:
    UserModel.findById(userId)
        .then(user => {
            if (user) {
                res.json({ isLoggedIn: true });
            } else {
                res.json({ isLoggedIn: false });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
});

app.post("/update-user/:userId", (req, res) => {
    const userId = req.params.userId;
    const { state, city, bloodGroup, bloodDonor } = req.body;

    UserModel.findByIdAndUpdate(userId, { state, city, bloodGroup, bloodDonor }, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ error: "User not found" });
            }
            res.status(200).json(updatedUser);
        })
        .catch(error => {
            console.error("Error updating user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
});


app.get("/donors", (req, res) => {
    // Fetch donor data from the database where bloodDonor is true
    UserModel.find({ bloodDonor: true })
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
});


app.listen(3001, ()=>{
    console.log("Server is running");
})