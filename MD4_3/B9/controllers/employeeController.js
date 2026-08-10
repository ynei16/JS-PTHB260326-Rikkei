const Employee = require('../models/Employee');
const AppError = require('../utils/AppError');

exports.getAllEmployees = (req, res, next) => {
    try {
        const data = Employee.getAll();
        res.status(200).json(data);
    } catch (err) { next(err); }
};

exports.createEmployee = (req, res, next) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            throw new AppError('Thiếu name hoặc email', 400);
        }
        
        const isExist = Employee.getAll().find(e => e.email === email);
        if (isExist) {
            throw new AppError('Email đã tồn tại', 409);
        }
        
        const newEmp = Employee.create({ name, email });
        res.status(201).json(newEmp);
    } catch (err) { next(err); }
};

exports.getEmployeeById = (req, res, next) => {
    try {
        const emp = Employee.findById(req.params.id);
        if (!emp) {
            throw new AppError('Không tìm thấy nhân viên', 404);
        }
        res.status(200).json(emp);
    } catch (err) { next(err); }
};

exports.uploadAvatar = (req, res, next) => {
    try {
        if (!req.file) {
            throw new AppError('Vui lòng cung cấp file ảnh', 400);
        }
        
        const emp = Employee.findById(req.params.id);
        if (!emp) {
            throw new AppError('Không tìm thấy nhân viên', 404);
        }
        
        const updatedEmp = Employee.updateAvatar(req.params.id, req.file.path);
        res.status(200).json({ message: "Upload thành công", data: updatedEmp });
    } catch (err) { next(err); }
};