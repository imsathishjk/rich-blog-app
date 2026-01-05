import { prisma } from "../config/db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";
import { uploadToCloudinary } from "../middleware/streamifier.js";

export const handleUserRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const image = req.file;

        if (!username || !email || !password || !image) {
            return res.json({ success: false, msg: 'Fileds are Should not be empty' })
        }
        const existingUser = await prisma.user.findUnique({ where: { email: email } });
        if (existingUser) {
            return res.json({ success: false, msg: 'User already exists, Please login' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const imageUrl = await uploadToCloudinary(image, 'image');
        console.log(imageUrl)
        const newUser = await prisma.user.create({
            data: { username, email, password: hashedPassword, image: imageUrl }
        });
        if (!newUser) {
            return res.json({ success: false, msg: 'Error in creating a user' })
        }
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 1
        })
        return res.json({ success: true, msg: 'user added successfully', user: newUser })


    } catch (err) {
        res.json({ success: false, msg: err.message })
    }
}

export const userLogin = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, msg: 'Invalid email or password' })
        }
        const existingUser = await prisma.user.findUnique({ where: { email: email } })
        if (!existingUser) {
            return res.json({ success: false, msg: 'User not found' })
        }
        const isValidPassword = await bcrypt.compare(password, existingUser.password)
        if (!isValidPassword) {
            return res.json({ success: false, msg: 'Invalid Password' })
        }
        const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 1
        })
        return res.json({ success: true, msg: 'Logged in successfully', user: existingUser })
    } catch (err) {
        res.json({ success: false, msg: err.message })
    }
}


export const updateUser = async (req, res) => {
    try {
        const userId = req.userId;
        const image = req.file;
        if (!image) {
            return res.json({ success: false, msg: 'Please upload image to proceed' })
        }
        const imageUrl = await uploadToCloudinary(image, 'image');
        const updatedUser = await prisma.user.update({ where: { id: userId }, data: { image: imageUrl } })
        if (updatedUser) {
            return res.json({ success: true, msg: 'Profile Picture Updated Successfully' })
        }
        return res.json({ success: false, msg: 'error in updating a profile picture' })
    } catch (err) {
        res.json({ success: false, msg: err.message })
    }

}


export const userLogout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })
        return res.json({ success: true, msg: 'Logged out' })
    } catch (err) {
        res.json({ success: false, msg: err.message })
    }
}


export const isAuthenticated = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.json({ success: false, msg: 'Not Authorized', isAuth: false });
        }
        return res.json({ success: true, msg: 'Authenticated user', isAuth: true });
    } catch (err) {
        return res.json({ success: false, msg: err.message });
    }
}

export const userData = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await prisma.user.findUnique({ where: { id: userId } });
        return res.json({ success: true, msg: 'user data fetched', data: user });
    } catch (err) {
        return res.json({ success: false, msg: err.message })
    }

}

export const DeleteAllUsers = async (req, res) => {
    try {
        const allUsers = await prisma.user.deleteMany({});
        return res.json({ success: true, msg: 'Users deleted', data: allUsers })
    } catch (err) {
        return res.json({ success: false, msg: err.message })
    }
}

export const fectAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({});
        return res.json({ success: true, msg: 'users fetched', data: users });
    } catch (err) {
        return res.json({ success: false, msg: err.message })
    }
}
