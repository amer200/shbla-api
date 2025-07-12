const User = require("../models/User");
const Client = require("../models/Client");
const jwt = require("jsonwebtoken");

const genrateToken = (user) => {
    return jwt.sign({
            id: user._id,
            role: user.role,
            isBlocked: user.isBlocked,
            clintProfile: user.clintProfile
        },
        process.env.JWT_SECRET, { expiresIn: '7D' })
}
exports.register = async(req, res) => {
    try {
        const { fullName, email, password, role, clientProfile } = req.body;
        const user = new User({
            fullName,
            email,
            password,
            role,
            clientProfile: role === 'client' ? clientProfile : null
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
        const user = await User.findOne({ email }).populate('clientProfile');
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
        }).populate('clientProfile');

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'خطأ أثناء التحديث', error: err.message });
    }
};