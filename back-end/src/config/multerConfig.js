// multerConfig.js
import multer from 'multer';
import path from 'path';

// Cấu hình multer cho việc upload file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/'); // Thư mục lưu file
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Tạo tên file duy nhất
    }
});

// Tạo một instance của multer với cấu hình đã tạo
const upload = multer({ storage: storage });

export default upload;
