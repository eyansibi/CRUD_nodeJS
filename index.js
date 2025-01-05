const express = require('express')
const mongoose = require("mongoose");
const productRoute = require("./routes/product.route.js");
const Product = require("./models/product.model")
const app = express()


//midlwar
app.use(express.json())
app.use(express.urlencoded({extended: false}));
// app.listen(3001,()=>{
//     console.log('server is running on port 3000 ');

// })
// routes
app.use("/api/products", productRoute);

    mongoose.connect("mongodb://127.0.0.1:27017/hiiiii")
    .then(() => {
      console.log("Connected to database!");
      app.listen(3000, () => {
        console.log("Server is running on port 3000");
      });
    })
    .catch((error) => {
      console.error("Connection failed! Error details:", error);
      process.exit(1); // Exit after failed connection attempt to stop the server restart loop
    });
  