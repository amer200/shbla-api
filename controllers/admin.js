const Jisr = require("../models/Jisr");
const axios = require('axios');

exports.updateJisrToken = async(req, res) => {
    try {
        const jisr = await Jisr.findOne();
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.jisr.net/openapi/v1/auth',
            headers: {
                'slug': 'shebla',
                'api-key': jisr.apiKey,
                'secret': jisr.apiSecret,
                'Accept': 'application/json',
                'api-version': '1'
            }
        };
        const token = (await axios.request(config)).data;
        jisr.token = token.data
        await jisr.save()
        return res.status(200).json({
            message: "token updated"
        })
    } catch (err) {
        console.log(err)
    }
}