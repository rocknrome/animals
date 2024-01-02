// DEPENDENCIES
const mongoose = require("mongoose");

// Connect to our database
mongoose.connect(process.env.DATABASE_URL);

// Connection status listeners
mongoose.connection.on("error", (err) => console.log(err.message + " - oops, there is an error connecting to the animals database"));
mongoose.connection.on("connected", () => console.log("Connected to MongoDB (animals database)"));
mongoose.connection.on("disconnected", () => console.log("Disconnected from MongoDB (animals database)"));
