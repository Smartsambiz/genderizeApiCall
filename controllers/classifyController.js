const axios = require("axios");

const getGender = async (req, res)=>{
    try{
        const { name } = req.query;

        // Validation
        if(!name){
            return res.status(400).json({
                status: "error",
                message: "Name query parameter is required"
            });
        }

        if(typeof name !== "string"){
            return res.status(422).json({
                status: "error",
                message: "Name must be a string"
            });
        }

        // Call Genderize API
        const response = await axios.get(
            `https://api.genderize.io?name=${name}`
        );

        const data = response.data;

        // Edge case handling
        if(!data.gender || data.count === 0){
            return res.status(422).json({
                status: "error",
                messsage: "No prediction available for the provided name"
            });
        }

        // Process Data
        const gender = data.gender;
        const probability = data.probability
        const sample_size = data.count;

        const is_confident = probability >= 0.7 && sample_size >=100;

        const processed_at = new Date().toISOString();

        // Final response
        return res.status(200).json({
            status: "success",
            data: {
                name: name.toLowerCase(),
                gender,
                probability,
                sample_size,
                is_confident,
                processed_at
            }
        })
    } catch(error){
        return res.status(502).json({
            status: "error",
            message: "Failed to fetch data from external API"
        });
    }
};

module.exports = getGender