const mongoose = require("mongoose")


async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://atomisefarouk919:D01FjZV9N05j3izI@cluster0.jbf0q6a.mongodb.net/MERNE-commerce?retryWrites=true&w=majority&appName=Cluster0')
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB