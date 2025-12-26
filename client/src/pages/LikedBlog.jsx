import React, { useContext, useEffect, useState } from 'react'
import { FaHandHoldingHeart } from "react-icons/fa6";
import axios from 'axios';
import AppContext from '../context/AppContext';
import { motion } from 'motion/react';
const LikedBlog = () => {
    const { backendUrl, blogs, isAuth } = useContext(AppContext);
    const [usersLikedBlogs, setUsersLikedBlogs] = useState([]);
    const [uniqueBlogs, setUniquBlogs] = useState([]);

    const fetchUserLikedBlogs = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/liked-blogs`, { withCredentials: true });
            setUsersLikedBlogs(data.blogs);
        } catch (err) {
            console.log(err)
        }
    };
    const filteredLikedBlogs = () => {
        const tempData = blogs.filter((blog) => usersLikedBlogs.some((user) => blog.id == user.blogId));
        setUniquBlogs(tempData);
    }
    useEffect(() => {
        filteredLikedBlogs();
    }, [usersLikedBlogs]);

    useEffect(() => {
        fetchUserLikedBlogs();
    }, [isAuth]);
    return (
        <div className='border-l border-l-gray-500 px-4 md:px-8'>
            <div>
                {
                    uniqueBlogs.map((data, i) => {
                        return <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            key={data.id} className='flex flex-col gap-2 w-full'>
                            <h1 className='font-semibold'><span>{i + 1} .</span> {data.title}</h1>
                            <div className='flex max-sm:flex-col items-center justify-between gap-5 my-3 bg-transparent border border-gray-600 rounded-md p-3'>
                                <img src={data.posterUrl} alt={data.title} className='max-sm:w-full w-12 object-cover rounded-md max-sm:h-32' />
                                <div className='max-sm:hidden md:flex justify-between gap-2'>
                                    <p className='text-sm font-medium text-gray-400'>Categories:</p>
                                    {
                                        data.category.map((c, i) => {
                                            return <p className='text-sm font-medium text-gray-400' key={i}>{c}</p>
                                        })
                                    }
                                </div>
                                <button className='text-gray-600 text-sm font-medium flex flex-col items-center'><FaHandHoldingHeart className='text-xl text-orange-500 ' />Total Likes: {data.likes}</button>
                            </div>
                        </motion.div>
                    })
                }
            </div>
        </div>
    )
}

export default LikedBlog
