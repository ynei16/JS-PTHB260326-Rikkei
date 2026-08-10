const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Tạo thư mục uploads nếu chưa có
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Cấu hình lưu trữ
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Tên file không trùng lặp
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Kiểm tra loại file
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        // Trả về lỗi nếu sai định dạng
        cb(new Error('INVALID_TYPE'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: fileFilter
});

app.post('/upload/avatar', (req, res) => {
    const uploadSingle = upload.single('avatar');
    
    uploadSingle(req, res, function (err) {
        if (err) {
            // Lỗi quá dung lượng của Multer
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ message: "File vượt quá dung lượng cho phép (2MB)" });
            }
            // Lỗi sai định dạng file do ta tự định nghĩa ở fileFilter
            if (err.message === 'INVALID_TYPE') {
                return res.status(400).json({ message: "Chỉ chấp nhận file ảnh JPEG/PNG/WEBP" });
            }
            // Các lỗi khác
            return res.status(500).json({ message: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Vui lòng đính kèm file ở field 'avatar'" });
        }

        // Thành công
        res.status(200).json({
            message: "Upload thành công",
            filename: req.file.filename,
            size: req.file.size
        });
    });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Bài 7 Server đang chạy tại port ${PORT}`));