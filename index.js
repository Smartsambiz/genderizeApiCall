const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

const getgenderRoutes = require("./routes/getgenderRoutes");



app.use(cors({
    origin: "*"
}));

app.use("/api", getgenderRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});