import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import AppContext from '../context/AppContext'
import axios from 'axios';
import { BsBookmarkXFill } from "react-icons/bs";
import toast from 'react-hot-toast';
import { TfiFaceSad } from "react-icons/tfi";
import { motion } from 'motion/react'


const SavedBlogs = () => {
    const { backendUrl, fetchSavedBlogs, filterUserSavedBlogs } = useContext(AppContext);

    const handleRemoveSavedBlogs = async (id) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/remove-saved-blog/${id}`, { withCredentials: true })
            if (data.success) {
                toast.success(data.msg);
                fetchSavedBlogs();
            } else {
                toast.error(data.msg);
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    useEffect(() => {
        fetchSavedBlogs();
    }, [])

    return (
        <div className='h-[60vh]'>
            <div className='flex flex-col gap-5 mt-8'>
                {
                    filterUserSavedBlogs.length > 0 && (

                        filterUserSavedBlogs.map((blog, i) => {
                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 25 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    key={blog.id} className='flex flex-col gap-2 rounded-md border border-gray-200 p-3'>
                                    <h1 className='font-semibold flex-1'>{i + 1}. {blog.title}</h1>
                                    <div className='flex items-center'>
                                        <img src={blog.posterUrl} alt={blog.title} className='w-20 object-cover rounded-md' />
                                        {
                                            blog.category.map((item, i) => {
                                                return <p className='font-medium text-sm text-gray-700 flex-1 text-center' key={i}>{item}</p>
                                            })
                                        }
                                        <button onClick={() => handleRemoveSavedBlogs(blog.id)} className='flex-1 max-w-fit flex items-center gap-1 font-semibold text-red-400 cursor-pointer'><BsBookmarkXFill className='text-lg' /></button>
                                    </div>
                                </motion.div>
                            )
                        })

                    )
                }
            </div>
            {filterUserSavedBlogs.length <= 0 && (<p className='text-lg font-semibold text-gray-800 flex flex-col gap-3 items-center justify-center'>
                <TfiFaceSad className='text-3xl font-extrabold text-orange-600' />
                No Blogs</p>)}
        </div>
    )
}

export default SavedBlogs
