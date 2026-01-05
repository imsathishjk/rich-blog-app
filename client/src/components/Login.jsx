import React, { useContext, useRef, useState } from 'react'
import { HiMiniUser } from "react-icons/hi2";
import { IoIosMail } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { SiOpensearch } from 'react-icons/si';
import { IoCloseSharp } from "react-icons/io5";
import AppContext from '../context/AppContext';
import user_icon from '../assets/user icon.png'
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'motion/react'

const Login = () => {
    const [status, setStatus] = useState('Signup');
    const [showPass, setShowPass] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const { setShowLogin, backendUrl, handleUserData, fetchSavedBlogs } = useContext(AppContext);
    const imageRef = useRef(null);
    const handleAuthentication = async (event) => {
        event.preventDefault();
        if (status == 'Signup') {
            try {
                const formData = new FormData();
                formData.append('username', username);
                formData.append('email', email);
                formData.append('password', password);
                formData.append('image', image);
                const { data } = await axios.post(`${backendUrl}/api/user/register`, formData, { withCredentials: true });
                if (data.success) {
                    setShowLogin(false);
                    handleUserData();
                    fetchSavedBlogs();
                    setUsername('');
                    setEmail('');
                    setPassword('')
                    toast.success(data.msg)
                } else {
                    toast.error(data.msg);
                }
            } catch (err) {
                toast.error(err.message || 'Something went wrong');
            }

        }
        if (status == 'Login') {
            try {
                const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password }, { withCredentials: true });
                if (data.success) {
                    setShowLogin(false);
                    handleUserData();
                    fetchSavedBlogs();
                    setEmail('');
                    setPassword('')
                    toast.success(data.msg)
                } else {
                    toast.error(data.msg);
                }
            } catch (err) {
                toast.error(err.message || 'Something went wrong');
            }
        }
    }
    const handleImageUrl = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    }

    const handleRemoveImage = () => {
        imageRef.current.value = '';
        setImage('');
        setImagePreview('');
    }
    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className='z-30 relative
        '>
            <form onSubmit={handleAuthentication} className='flex flex-col gap-6 absolute top-1/2 left-1/2 bg-white text-black shadow rounded-md p-2 px-4
        max-w-md max-sm:w-[95%] w-full transform -translate-x-1/2'>
                <IoCloseSharp className='font-bold text-3xl cursor-pointer text-violet-600' onClick={() => setShowLogin(false)} />
                <h1 className='text-2xl lg:text-3xl font-bold flex items-center gap-1 justify-center text-violet-600'><SiOpensearch className='mt-1' /> Rich</h1>
                <h1 className='text-center font-bold text-xl'>{status}</h1>
                {
                    status == 'Signup' && (<div className='flex items-center justify-between w-full gap-2 border-2 border-gray-300 p-2 rounded-md'>
                        <input required type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} className='text-sm font-medium placeholder:text-sm w-full outline-none border-none' />
                        <HiMiniUser />
                    </div>)
                }
                <div className='flex items-center justify-between w-full gap-2 border-2 border-gray-300 p-2 rounded-md'>
                    <input required type="email" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} className='text-sm font-medium placeholder:text-sm w-full outline-none border-none' />
                    <IoIosMail />
                </div>
                <div className='flex items-center justify-between w-full gap-2 border-2 border-gray-300 p-2 rounded-md'>
                    <input required type={showPass ? 'text' : 'password'} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='text-sm font-medium placeholder:text-sm w-full outline-none border-none' />
                    {showPass ? <IoIosEyeOff className='cursor-pointer' onClick={() => setShowPass(false)} /> : <IoIosEye className='cursor-pointer' onClick={() => setShowPass(true)} />}
                </div>
                {
                    status == 'Signup' && (
                        <div className='text-sm text-violet-600'>
                            <input ref={imageRef} required type="file" accept='/image*' onChange={handleImageUrl} />
                            {image && (
                                <div className='flex items-start gap-2 mt-2'>
                                    <img src={image ? imagePreview : user_icon} alt='user uploaded image' className='w-16 rounded-md' />
                                    <IoCloseSharp className='text-2xl text-gray-400 cursor-pointer' onClick={handleRemoveImage} />
                                </div>
                            )}
                        </div>
                    )
                }
                <div className='flex items-center gap-1'>
                    <input type="checkbox" required className='mb-0.5' />
                    <p className='font-semibold text-gray-600 text-sm'>Accept terms & conditions</p>
                </div>
                <button type='submit' className='py-2 px-4 rounded-md bg-gradient-to-br from-violet-700 to-violet-600 text-white cursor-pointer font-semibold'>{status}</button>
                <div className='flex items-center gap-1 justify-center'>

                    {
                        status == 'Signup' ? <p className='text-sm font-medium'>Already have an account? <span onClick={() => setStatus('Login')} className='text-[16px] text-violet-600 ml-2 cursor-pointer font-semibold'>Login</span></p> :
                            <p className='text-sm font-medium'>Don't have an account? <span onClick={() => setStatus('Signup')} className='text-[16px] text-violet-600 ml-2 cursor-pointer font-semibold'>Signup</span></p>
                    }
                </div>
            </form>
        </motion.div>
    )
}

export default Login