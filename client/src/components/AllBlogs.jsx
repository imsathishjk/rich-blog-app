import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext';
import { PiBookmarkSimple } from "react-icons/pi";
import { PiBookmarkSimpleFill } from "react-icons/pi";
import { MdEditSquare } from "react-icons/md";
import moment from 'moment'
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'motion/react'

const AllBlogs = () => {

    const { blogs, navigate, backendUrl, user, filterUserSavedBlogs, fetchSavedBlogs, isAuth, setShowLogin } = useContext(AppContext);
    const [bookMark, setBookMark] = useState(false);

    const handleSaveBookMark = async (id) => {
        if (!isAuth) {
            toast.error('Login to Save')
        }
        try {
            const { data } = await axios.post(`${backendUrl}/api/save-blog/${id}`, { withCredentials: true })
            if (data.success) {
                fetchSavedBlogs();
                toast.success(data.msg)
                setBookMark(true);
            } else {
                toast.error(data.msg);
            }
        } catch (err) {
            toast.error(err.message)
        }
    }
    const handleUnsaveBookMark = async (id) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/remove-saved-blog/${id}`, { withCredentials: true })
            if (data.success) {
                fetchSavedBlogs();
                toast.success(data.msg)
                setBookMark(false);
            } else {
                toast.error(data.msg);
            }

        } catch (err) {
            toast.error(err.message);
        }
    }
    const handleNavigate = (id) => {
        if (!isAuth) {
            setShowLogin(true)
        }
        navigate(`/blog/${id}`, scrollTo(0, 0));
    }
    return (

        <div className='mt-20'>
            <h1 className='text-center font-bold text-xl md:text-2xl tracking-wide select-none'>All Blogs</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-sm:place-items-center'>
                {
                    blogs.map((blog) => {
                        return (
                            <div key={blog.id} className='cursor-pointer text-black rounded-md'>
                                <div className='rounded-lg relative group'>
                                    <motion.img
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        src={blog.posterUrl} alt={blog.title} className='rounded-lg object-cover h-[250px] w-full' ></motion.img >
                                    <div className='absolute top-0 left-0 flex items-center gap-3 z-0'>
                                        {
                                            blog.category.length > 1 ? (
                                                blog.category.map((c, i) => {
                                                    return <button className='bg-black text-orange-600 font-semibold p-1 rounded text-[12px]' key={i}>{c}</button>
                                                })
                                            ) : <button className='bg-white text-violet-600 font-semibold p-1.5 rounded-ee-md text-[12px]'>{blog.category[0]}</button>
                                        }

                                    </div>
                                    <div className='absolute bottom-2 right-2  group-hover:visible invisible w-6 flex items-center justify-center h-6 rounded-full bg-violet-50 z-10 '>

                                        {
                                            filterUserSavedBlogs.some((item) => item.id == blog.id) ?
                                                <PiBookmarkSimpleFill onClick={() => handleUnsaveBookMark(blog.id)} className='p-0.5 text-xl text-violet-600' /> :
                                                <PiBookmarkSimple className='p-0.5 text-xl text-violet-600' onClick={() => handleSaveBookMark(blog.id)} />

                                        }
                                    </div>
                                </div>

                                <div onClick={() => handleNavigate(blog.id)} >
                                    <div className='flex items-center justify-between p-1.5'>
                                        <h1 className='font-bold text-sm flex items-center text-violet-600 uppercase gap-1'><MdEditSquare /> {user?.id == blog.userId ? user.username : 'Sathish'}</h1>
                                        <p className='font-bold text-sm text-orange-500'>{moment(blog.createdAt).format('DD MMM YY')}</p>
                                    </div>
                                    <div className=''>
                                        <h1 className='my-1 md:text-lg font-semibold'>{blog.title}</h1>
                                        {/* <div className='quill-content flex flex-col gap-3' dangerouslySetInnerHTML={{__html:blog.description.slice(0,200) + '...'}}>
                                          
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AllBlogs
