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

app.use('/', (req, res)=>{
    res.send("server is live")
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});