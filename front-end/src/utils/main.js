// viết hàm kiểm tra xem có phải là email không
export const isEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// viết hàm kiểm tra xem chuỗi nhập vào không có các ký tự như < ' " 
export const isSafe = (str) => {
    const re = /<|>|'|"/;
    return !re.test(str);
}

// viết hàm kiểm tra mật khẩu có đủ 6 ký tự không  
export const isPassword = (password) => {
    return password.length >= 6;
}

// viết hàm kiểm tra xem tên đăng nhập có đủ 6 ký tự không
export const isUsername = (username) => {
    return username.length >= 6;
}