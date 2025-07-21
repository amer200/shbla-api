const User = require("../models/User");
const Employee = require("../models/Employee");
const Jisr = require("../models/Jisr");
const axios = require('axios');
const jwt = require("jsonwebtoken");
const { param } = require("../routes/user");

const genrateToken = (user) => {
    return jwt.sign({
            id: user._id,
            role: user.role,
            isBlocked: user.isBlocked
        },
        process.env.JWT_SECRET, { expiresIn: '7D' })
}
exports.register = async(req, res) => {
    try {
        const { fullName, email, password, role } = req.body;
        const user = new User({
            fullName,
            email,
            password,
            role
        });
        await user.save();
        const token = genrateToken(user);
        res.status(201).json({
            user: user,
            token: token
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "بيانات الدخول خطاء!"
            })
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                message: "بيانات الدخول خطاء!"
            })
        }
        user.lastLogin = Date.now();
        const token = genrateToken(user);
        res.status(200).json({
            token: token
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
exports.getProfileData = async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            user: user
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
exports.updateProfile = async(req, res) => {
    try {
        const updates = req.body;
        delete updates.password;

        const user = await User.findByIdAndUpdate(req.user.id, updates, {
            new: true,
            runValidators: true
        });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'خطأ أثناء التحديث', error: err.message });
    }
};
exports.getClientEmployees = async(req, res) => {
    try {
        const clientId = req.user.id;
        const employees = await Employee.find({ "client.client": clientId });
        res.status(200).json({
            employees: employees
        })
    } catch (err) {
        res.status(500).json({ message: 'خطأ أثناء التحديث', error: err.message });
    }
}
exports.getEmpDetatils = async(req, res) => {
    try {
        const jisrId = req.body.jisrId;
        const jisr = await Jisr.findOne();
        let config = {
            method: '',
            maxBodyLength: Infinity,
            url: 'https://api.jisr.net/openapi/v1/employees/basic_info',
            headers: {
                'slug': 'shebla',
                'api-key': jisr.apiKey,
                'secret': jisr.apiSecret,
                'Access-Token': jisr.token,
                'Accept': 'application/json',
                'api-version': '1'
            },
            params: {
                id: jisrId
            }
        };
        const data = await axios.request(config);
        res.status(200).json({
            employee: data.data.data.employee
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'خطأ أثناء التحديث', error: err.message });
    }
}