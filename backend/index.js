require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");



//server Initalization
const app = express();
const PORT = process.env.PORT || 5000;

//Database connection
connectDB();

//Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// default route
app.get("/",(req,res)=>{
    res.send("Product Management Dashboard API");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});