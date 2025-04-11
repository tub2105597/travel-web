// email.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


const sendEmail = async (to, subject, text) => {
    // Cấu hình transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Bạn có thể sử dụng dịch vụ khác như SendGrid, Mailgun, v.v.
        auth: {
            user: process.env.EMAIL, // Địa chỉ email của bạn
            pass: process.env.EMAIL_PASSWORD // Mật khẩu email của bạn
        }
    });

    // Cấu hình email
    const mailOptions = {
        from: process.env.EMAIL, // Địa chỉ email của bạn
        to: to,
        subject: subject,
        html: `<h5>Xin chào,</h5><p>Bạn đang xác thực danh tính trước khi thay đổi mật khẩu.Mã OTP xác nhận của bạn là: <b>${text}</b></p><p>Hãy hoàn thành việc xác thực danh tính này trong 5 phút.</p><p>Travellite</p>` // Nội dung email của bạn
    };

    // Gửi email
    try {
        await transporter.sendMail(mailOptions);
        console.log('Gửi email thành công');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export default { sendEmail };