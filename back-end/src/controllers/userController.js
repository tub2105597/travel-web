import userService from '../services/userService';
import postService from '../services/postService';
import { emailService } from '../services';
import { jwtDecode } from "jwt-decode";

let OTPStore = {};

let handleSignIn = async (req, res) => {
    let { username, password } = req.body;
    console.log(username);
    let data = await userService.SignIn(username, password);
    return res.status(200).json({ data });

}

let getDataProfile = async (req, res) => {
    let { userid } = req.query;
    let data = {};
    data.user = await userService.getUser(userid);
    data.posts = await postService.getPostsByUserID(userid, 'createdAt', 'DESC', null);
    return res.status(200).json({ data });
}

let handleSignUp = async (req, res) => {
    let { username, password, email, fullname } = req.body;
    let avatar = 'http://localhost:8080/uploads/1728898797819.jpg';
    let data = await userService.SignUp(username, password, email, fullname, avatar);
    return res.status(200).json({ data });
}

let handleEditAvatar = async (req, res) => {
    let { username, link } = req.body;
    let data = await userService.editAvatar(username, link[0]);
    return res.status(200).json({ data });
}

let handleEditUser = async (req, res) => {
    try {
        let user = req.body.user;
        let data = await userService.editUser(user);
        return res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errCode: 2, message: 'Internal server error' });
    }
}

let handleDeleteUser = async (req, res) => {
    let { username } = req.body;

    try {
        let data = await userService.deleteUser(username);
        return res.status(200).json({ data });
    } catch (error) {
        console.error("Error in handleDeleteUser:", error);
        return res.status(500).json({ errCode: 2, message: 'Internal server error' });
    }
}

let getUsersRanking = async (req, res) => {
    try {
        const data = await userService.getUsersRanking(null, 'DESC', 3);
        return res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errCode: 2, message: 'Internal server error' });
    }
}

let getUsersByFilter = async (req, res) => {
    try {
        let data = await userService.getUsersByFilter(req.query);
        return res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errCode: 2, message: 'Internal server error' });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const data = await userService.getAllUsers();
        return res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errCode: 2, message: 'Internal server error' });
    }
}

const handleCreateUser = async (req, res) => {
    try {
        let { username, password, email, fullname, avatar, DoB, address, gender, role } = req.body.user;
        avatar = avatar ? avatar : 'http://localhost:8080/uploads/1728898797819.jpg';
        password = password ? password : '123456';
        const data = await userService.createUser(username, password, email, fullname, avatar, DoB, address, gender, role);
        return res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errCode: 2, message: 'Internal server error' });
    }
}

const handleGoogleLogin = async (req, res) => {
    try {
        const credential = req.body.credentialResponse.credential;
        const userInfor = jwtDecode(credential);
        const fullname = userInfor.name;
        const email = userInfor.email;
        const avatar = userInfor.picture;
        const username = email.split('@')[0];
        const password = '123456';
        const role = 'user';
        const DoB = '1950-01-01';
        const data = await userService.createUser(username, password, email, fullname, avatar, DoB, null, null, role);
        console.log(data);
        return res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errCode: 2, message: 'Internal server error' });
    }
}

const handleEmail = async (req, res) => {
    try {
        const { username } = req.body;
        const isExistUser = await userService.getUserByUsername(username);
        if (isExistUser) {
            const otp = Math.floor(100000 + Math.random() * 900000);
            OTPStore[username] = { otp, time: Date.now() };
            const data = await emailService.sendEmail(isExistUser.email, 'XÁC NHẬN ĐỊA CHỈ EMAIL ĐỂ THAY ĐỔI MẬT KHẨU', OTPStore[username].otp);
            return res.status(200).json({ data });
        } else {
            return res.status(400).json({ errCode: 1, message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errCode: 2, message: 'Internal server error' });
    }
}

const handleVerifyEmail = async (req, res) => {
    try {
        const { username, otp } = req.body;
        if (OTPStore[username] && OTPStore[username].otp == otp) {
            const currentTime = Date.now();
            if (currentTime - OTPStore[username].time <= 300000) {
                return res.status(200).json({ data: true, message: 'Mã xác thực hợp lệ' });
            } else {
                return res.status(400).json({ data: false, message: 'Mã xác thực đã quá hạn' });
            }
        } else {
            return res.status(400).json({ data: false, message: 'Mã xác thực không trùng khớp' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errCode: 2, message: 'Internal server error' });
    }
}

const handleChangePassword = async (req, res) => {
    try {
        const { username, password } = req.body;
        const data = await userService.changePassword(username, password);
        return res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errCode: 2, message: 'Internal server error' });
    }
}

export default {
    handleSignIn,
    handleSignUp,
    getDataProfile,
    handleCreateUser,
    handleEditUser,
    handleEditAvatar,
    handleDeleteUser,
    getUsersRanking,
    getUsersByFilter,
    getAllUsers,
    handleGoogleLogin,
    handleEmail,
    handleVerifyEmail,
    handleChangePassword
}