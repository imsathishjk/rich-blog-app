import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import { RiSearch2Line } from "react-icons/ri";
import { SiOpensearch } from "react-icons/si";
import AppContext from '../context/AppContext';
import { IoMdBookmark } from "react-icons/io";
import { IoCloseSharp, IoLogOut } from "react-icons/io5";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { RiAdminFill } from "react-icons/ri";
import Loader from './Loader.jsx';
import { motion } from 'motion/react';
import { TbPhotoEdit } from "react-icons/tb";


const Navbar = () => {
    const { setShowLogin, navigate, user, backendUrl, setUser, isAdmin, setIsAdmin, filterUserSavedBlogs, setIsAuth, isAuth, handleUserData } = useContext(AppContext);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const location = useLocation();
    const [image, setImage] = useState('');
    const [showUserProfile, setShowUserProfile] = useState(false);
    const [loading, setLoading] = useState(false);
    const imageRef = useRef();

    const handleLogout = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/logout`, {}, { withCredentials: true });
            if (data.success) {
                toast.success(data.msg)
                setShowOptions(false);
                setUser(null);
                isAdmin && setIsAdmin(false);
                setIsAuth(false);
                navigate('/');
            } else {
                toast.error(data.msg);
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdateProfile = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('image', image);
            setShowUserProfile(false);
            const { data } = await axios.post(`${backendUrl}/api/updateUser/${user.id}`, formData, { withCredentials: true })
            if (data.success) {
                handleUserData();
                setLoading(false)
                toast.success(data.msg);
            } else {
                toast.error(data.msg)
            }
        } catch (err) {
            toast.error(err.message);
        }
    }
    const handleImageUrl = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const handleRemoveImage = () => {
        imageRef.current.value = '';
        setImage('');
        setImagePreview('');
    }

    return (
        <div className='flex justify-between items-center sticky top-0 bg-white py-2 z-50'>
            <h1 onClick={() => navigate('/', scrollTo(0, 0))} className='cursor-pointer text-2xl lg:text-3xl font-bold flex items-center gap-1 select-none'><SiOpensearch className='mt-1' /> Rich</h1>
            <ul className='hidden md:flex items-center justify-between gap-12'>
                <li onClick={() => navigate('/', scrollTo(0, 0))} className='cursor-pointer font-semibold'>Home</li>
                <li onClick={() => navigate('/', scrollTo(0, 0))} className='cursor-pointer font-semibold'>All Blogs</li>
            </ul>
            {
                !location.pathname.includes('/admin') && (<button onClick={() => setShowSearchModal(!showSearchModal)} className='cursor-pointer'><RiSearch2Line className='font-bold text-xl' /></button>)
            }
            {
                !user && !isAuth && (<button className='bg-violet-200 py-1 px-4 rounded-md cursor-pointer font-bold text-violet-600 transition-colors duration-300 ease-in-out
            hover:bg-gradient-to-br hover:from-violet-700 hover:to-violet-600 hover:text-white max-sm:text-sm'
                    onClick={() => { setShowLogin(true), scrollTo(0, 0) }}>Login</button>)
            }
            {
                isAuth && !user && (
                    <Loader />
                )
            }
            {
                user && (
                    <div className='flex items-center gap-5'>
                        <h1 className='font-bold max-sm:text-sm text-orange-600'>Hi, {user?.username}</h1>
                        <div className='relative'>
                            {
                                loading ? <Loader /> : <img src={user?.image} alt="user_image" onClick={() => { setShowUserProfile(false), setShowLogin(false), setShowOptions(!showOptions) }} className='w-10 h-10 object-cover rounded-full cursor-pointer' />
                            }
                            {
                                showOptions && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className='absolute top-10 items-start right-6  flex flex-col w-40 bg-violet-100 p-1.5 rounded-ss-xl rounded-ee-xl rounded-es-xl z-20 '>
                                        {
                                            isAdmin && !location.pathname.includes('/admin') && (
                                                <button onClick={() => { navigate('/admin/add-blog'), scrollTo(0, 0), setShowOptions(false) }} className='cursor-pointer font-semibold text-orange-600 flex items-center gap-1 py-2 px-1'><RiAdminFill /> Admin Panel</button>
                                            )
                                        }
                                        {
                                            !location.pathname.includes('/saved-blogs') && (
                                                <button onClick={() => { navigate('/saved-blogs', scrollTo(0, 0)), setShowOptions(false) }} className='text-sm font-medium cursor-pointer text-violet-600 py-2 px-1 border-t border-t-gray-200 w-full text-left flex items-center gap-1'><IoMdBookmark /> Saved Blogs <span className='text-[16px] font-bold ml-1'>{filterUserSavedBlogs.length}</span></button>
                                            )
                                        }
                                        <button onClick={() => {
                                            setShowSearchModal(false);
                                            setShowOptions(false), setShowUserProfile(true)
                                        }} className='text-sm font-medium cursor-pointer text-violet-600 py-2 px-1 border-t border-t-gray-200 w-full text-left flex items-center gap-1'><TbPhotoEdit className='text-2xl' />Change Profile Picture</button>
                                        <button onClick={handleLogout} className='text-sm font-medium cursor-pointer text-violet-600 py-2 px-1 border-t border-t-gray-200 w-full text-left flex items-center gap-1'><IoLogOut /> Logout</button>
                                    </motion.div>
                                )
                            }
                        </div>
                    </div>
                )
            }
            {
                showSearchModal && !location.pathname.includes('/admin') && (
                    <div className='bg-gradient-to-br from-gray-800 to-gray-950 text-white absolute top-16 max-sm:left-0 md:left-40 lg:left-96 p-3 rounded-md w-full max-w-sm z-10'>
                        <h1 className='font-medium mb-5 max-sm:text-sm'>What are you looking for?</h1>
                        <div className='w-full flex items-center'>
                            <input type="text" placeholder='Start typing...' className='p-3 px-2 placeholder:text-sm outline-none border-none text-sm w-full' />
                            <button className='p-2 bg-white text-black rounded-md text-sm font-medium cursor-pointer' >Search</button>
                        </div>
                    </div>
                )
            }
            {
                showUserProfile && (
                    <div className='text-sm text-violet-600 font-bold flex flex-col gap-5 absolute top-20 bg-gradient-to-br from-violet-200 to-violet-300 right-0 p-5 rounded-md'>
                        <input ref={imageRef} required type="file" accept='/image*' onChange={handleImageUrl} />
                        {image && (
                            <div className='flex items-start gap-2 mt-2'>
                                <img src={image ? URL.createObjectURL(image) : user.image} alt='user uploaded image' className='w-16 rounded-md border border-violet-500' />
                                <IoCloseSharp className='text-2xl text-violet-600 cursor-pointer' onClick={handleRemoveImage} />
                            </div>
                        )}
                        <button onClick={handleUpdateProfile} className='text-sm font-medium cursor-pointer bg-violet-600 text-white py-2 px-1 w-full text-center flex items-center gap-1 justify-center'>Update</button>
                    </div>
                )
            }
        </div>
    )
}

export default Navbar
