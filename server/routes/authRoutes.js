import express from 'express';
import { DeleteAllUsers, fectAllUsers, handleUserRegister, isAuthenticated, userData, userLogin, userLogout } from '../controllers/authControllers.js';
import { upload } from '../middleware/multer.js';
import { authMiddleWare } from '../middleware/auth.js';


const authRoute = express.Router();


authRoute.post('/user/register', upload.single('image'), handleUserRegister);
authRoute.post('/user/login', userLogin);
authRoute.post('/user/logout', userLogout);
authRoute.get('/user', authMiddleWare, userData);
authRoute.get('/is-auth', authMiddleWare, isAuthenticated);
authRoute.delete('/user/delete', DeleteAllUsers);
authRoute.get('/all-users', fectAllUsers)


export default authRoute;