const Employee = require("../models/Employee");
const Jisr = require("../models/Jisr");
const axios = require('axios');
const User = require("../models/User");
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
exports.getAllJisrEmployees = async(req, res) => {
    try {
        const jisr = await Jisr.findOne();
        let config = {
            method: 'get',
            url: 'https://api.jisr.net/openapi/v1/employees',
            headers: {
                'slug': 'shebla',
                'api-key': jisr.apiKey,
                'secret': jisr.apiSecret,
                'Access-Token': jisr.token,
                'Accept': 'application/json',
                'api-version': '1'
            }
        }
        const data = await axios.request(config);
        res.status(200).json({
            employees: data.data.data
        })
    } catch (err) {
        console.log(err)
    }
}
exports.getAllLocalEmployees = async(req, res) => {
    try {
        const employees = await Employee.find().populate('client.client');
        res.status(200).json({
            employees: employees
        })
    } catch (err) {
        console.log(err)
    }
}
exports.linkEmployeeWithClient = async(req, res) => {
    try {
        const { jasirId, clientId, title, name } = req.body;
        const employee = await Employee.findOne({ jasirId: jasirId });
        if (!employee) {
            const newEmployee = new Employee({
                jasirId: jasirId,
                name: name,
                client: {
                    title: title,
                    client: clientId
                }
            })
            await newEmployee.save();
            res.status(200).json({
                employee: newEmployee
            })
        } else {
            employee.client.client = clientId;
            employee.client.title = title;
            await employee.save();
            res.status(200).json({
                employee: employee
            })
        }
    } catch (err) {
        console.log(err)
    }
}
exports.unLinkEmployeeWithClient = async(req, res) => {
    try {
        //comment
        const { employeeId } = req.body;
        const employee = await Employee.findById(employeeId);
        employee.client = null;
        await employee.save();
        res.status(200).json(employee);
    } catch (err) {
        console.log(err)
    }
}
exports.getAllClients = async(req, res) => {
    try {
        const clients = await User.find({ role: 'client' });
        res.status(200).json({
            clients: clients
        })
    } catch (err) {
        console.log(err)
    }
}