import React, { useContext, useEffect } from 'react'
import { SiOpensearch } from 'react-icons/si'
import { NavLink, Outlet } from 'react-router-dom';
import { FaSquarePlus } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";
import { FaHandHoldingHeart } from "react-icons/fa";
import AppContext from '../context/AppContext';
import { motion } from 'motion/react';
const Admin = () => {
    const { navigate, isAdmin } = useContext(AppContext);

    useEffect(() => {
        navigate('/admin/add-blog');
        if (!isAdmin) {
            navigate('/');
        }
    }, []);

    return (
        <div className='relative'>
            {/* Admin Panel Links */}
            <div className='flex justify-between mt-12 md:mt-20 gap-5 md:gap-12 lg:gap-20'>
                {/* Links */}
                <div className='flex flex-col gap-8 items-start'>
                    <NavLink className={({ isActive }) => `max-sm:w-fit w-full p-3 font-semibold flex items-center gap-2 ${isActive ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-r-4 border-r-orange-600 text-orange-600' : ''}`} to={'/admin/add-blog'}>
                        <span><FaSquarePlus className='text-xl' /></span>
                        <span className='max-sm:hidden block'>Add Blogs</span>
                    </NavLink>
                    <NavLink className={({ isActive }) => `max-sm:w-fit w-full p-3 font-semibold flex items-center gap-2 ${isActive ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-r-4 border-r-orange-600 text-orange-600' : ''}`} to={'/admin/manage-blogs'}>
                        <span><MdEditSquare className='text-xl' /></span>
                        <span className='max-sm:hidden block'>Manage Blogs</span>
                    </NavLink>
                    <NavLink className={({ isActive }) => `max-sm:w-fit w-full p-3 font-semibold flex items-center gap-2 ${isActive ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-r-4 border-r-orange-600 text-orange-600' : ''}`} to={'/admin/liked-blogs'}>
                        <span><FaHandHoldingHeart className='text-xl' /></span>
                        <span className='max-sm:hidden block'>Likded Blogs</span>
                    </NavLink>
                </div>
                {/* Outlet */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className='flex-1'>
                    <Outlet />
                </motion.div>
            </div>
        </div >
    )
}
// 
{/* <motion.li layoutId="item" /> */ }
// 
export default Admin
