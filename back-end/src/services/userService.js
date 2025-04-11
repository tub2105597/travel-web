import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
const { fn, col, literal, Op } = require('sequelize');


let getUserByUsername = async (username) => {
    try {
        let user = await db.Users.findOne({
            where: { username: username },
            exclude: ['password']
        });
        if (user) {
            return user;
        } else {
            return {};
        }
    } catch (e) {
        reject(e);
    }
}

let getUser = async (id) => {
    try {
        let user = await db.Users.findOne({
            where: { id: id },
            raw: true
        });
        if (user) {
            delete user.password;
        }
        return user ? user : {};
    } catch (e) {
        throw e;
    }
}

let getUserIDByUsername = async (username) => {
    try {
        let user = await db.Users.findOne({
            where: { username: username }
        });
        if (user) {
            return user.id;
        }
    }
    catch (e) {
        throw e;
    }
}

let getAllUsers = () => {
    try {
        let users = db.Users.findAll({
            where: { role: 'user' },
            attributes: {
                exclude: ['password']
            }
        });
        return users ? users : [];
    } catch (e) {
        throw e;
    }
}

let SignIn = async (username, password) => {
    try {
        let res = {}
        let isExist = await checkUsername(username);
        if (isExist) {
            let user = await getUserByUsername(username);
            let passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                delete user.password;
                res.errCode = '';
                res.message = 'Đăng nhập thành công';
                res.user = user;
                return res;
            } else {
                res.errCode = 'ERR_B2';
                res.message = 'Sai mật khẩu. Vui lòng nhập lại';
                res.user = {};
                return res;
            }
        } else {
            res.errCode = 'ERR_B3';
            res.message = 'Username không tồn tại. Vui lòng nhập lại';
            res.user = {};
            return res;
        }
    } catch (e) {
        throw (e);
    }
}

let checkUsername = async (username) => {
    try {
        let user = await db.Users.findOne({
            where: { username: username }
        });
        return user ? true : false;
    } catch (e) {
        throw e;
    }
}

let hashUserPassword = async (data) => {
    try {
        let hashPassword = await bcrypt.hashSync(data, salt);
        return hashPassword;
    } catch (e) {
        throw e;
    }
}

let SignUp = async (username, password, email, fullname, avatar) => {
    try {
        let res = {};
        if (await checkUsername(username)) {
            res.errCode = 'ERR_B1';
            res.message = 'Username đã tồn tại';
            res.user = {};
            return res;
        }
        let hashPasswordFromBcrypt = await hashUserPassword(password);
        await db.Users.create({
            username: username,
            password: hashPasswordFromBcrypt,
            email: email,
            fullname: fullname,
            avatar: avatar,
            role: 'user'
        });

        let user = await getUserByUsername(username);
        delete user.password;

        res.errCode = '';
        res.message = 'Tạo tài khoản thành công';
        res.user = user;

        return res;
    } catch (e) {
        throw e;
    }
}

let editAvatar = async (username, link) => {
    try {
        let user = await getUserByUsername(username);
        user.avatar = link;
        await user.save();
        return user;
    } catch (e) {
        throw e;
    }
}

let editUser = async (userData) => {
    try {
        let res = {};
        let user = await getUserByUsername(userData.username);

        if (!user) {
            res.errCode = 'ERR_B3';
            res.message = 'User not found';
            res.user = {};
            return res;
        }

        userData.password ? user.password = await hashUserPassword(userData.password) : null;
        user.email = userData.email;
        user.fullname = userData.fullname;
        user.gender = userData.gender;
        user.address = userData.address;
        user.DoB = userData.DoB;

        await user.save();

        return user;
    } catch (e) {
        throw e;
    }
}

let deleteUser = async (username) => {
    try {
        let user = await getUserByUsername(username);
        if (!user) {
            throw new Error("User not found");
        }
        await user.destroy();
        return { errCode: '', message: 'Delete user successfully' };
    } catch (e) {
        throw e;
    }
}

const getUsersRanking = async () => {
    try {
        const users = await db.Users.findAll({
            where: {
                role: 'user'
            },
            attributes: [
                'id',
                'fullname',
                'username',
                'avatar',
                [literal(`(SELECT COUNT(*) FROM Posts WHERE Posts.userId = Users.id)`), 'postCount']
            ],
            order: [[literal('postCount'), 'DESC']],
            limit: 10
        });
        return users ? users : [];
    } catch (e) {
        throw e;
    }
}

const getUsersByFilter = async (query) => {
    try {
        const { search, address, gender, order, type, limit } = query;

        const users = await db.Users.findAll({
            where: {
                [Op.and]: [
                    search ? {
                        [Op.or]: [
                            { username: { [Op.like]: `%${search}%` } },
                            { fullname: { [Op.like]: `%${search}%` } }
                        ]
                    } : {},
                    address ? { address: { [Op.like]: `%${address}%` } } : {},
                    gender ? { gender: { [Op.like]: `%${gender}%` } } : {}
                ],
            },
            attributes: {
                exclude: ['password']
            },
            order: [[order || 'createdAt', type || 'DESC']],
            limit: parseInt(limit, 10) || null
        });

        return users || [];
    } catch (e) {
        throw e;
    }
};


const createUser = async (username, password, email, fullname, avatar, DoB, address, gender, role) => {
    try {
        password = await hashUserPassword(password);

        const isExist = await getUserByUsername(username);
        if (isExist && isExist.id) {
            return isExist;
        }
        const newUser = await db.Users.create({
            username,
            password,
            email,
            fullname,
            avatar,
            DoB,
            address,
            gender,
            role
        });

        let user = await db.Users.findOne({
            where: { username: username },
            attributes: {
                exclude: ['password']
            }
        });
        console.log(user);
        return user ? user : {};
    } catch (e) {
        throw e;
    }
}

const changePassword = async (username, password) => {
    try {
        let user = await getUserByUsername(username);
        user.password = await hashUserPassword(password);
        pass
        await user.save();
        return user;
    } catch (e) {
        throw e;
    }
}

export default {
    checkUsername,
    getUser,
    getUserIDByUsername,
    getUserByUsername,
    SignIn,
    getAllUsers,
    hashUserPassword,
    SignUp,
    editAvatar,
    editUser,
    deleteUser,
    getUsersRanking,
    getUsersByFilter,
    createUser,
    changePassword
}