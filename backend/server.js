const express = require("express");
const cors = require("cors");
const inventoryRoutes = require("./routes/inventoryRoutes.js");
const mongoose = require("mongoose");
const password = require("./constants");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
    `mongodb+srv://Arcfej:${password}@cluster0.v3jjdto.mongodb.net/?retryWrites=true&w=majority`, {
        useNewUrlParser: true
    }).then(() => {
        console.log("Inventory DB Connected");
    });

app.use("/api/inventory", inventoryRoutes);

app.listen(5000, console.log("Server started on port 5000"));
