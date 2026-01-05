import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RiHeartLine } from "react-icons/ri";
import { RiHeartFill } from "react-icons/ri";
import AppContext from '../context/AppContext.jsx';
import moment from 'moment';
import toast from 'react-hot-toast';
import { MdEditSquare } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
import { motion } from 'motion/react';
import Loader from '../components/Loader.jsx';

const SingleBlog = () => {
    const { id } = useParams();
    const { navigate, setShowModal, user, backendUrl, isAuth } = useContext(AppContext);
    const [blogData, setBlogData] = useState([]);
    const [likes, setLikes] = useState([]);
    const [likeCount, setLikeCount] = useState(0);
    const [loading, setLoading] = useState(false);


    const handleBlogData = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/single-blog/${id}`, { withCredentials: true });
            if (data.success) {
                setBlogData(data.blog);
                setLoading(false);
            }
        } catch (err) {
            console.log(err)
        }
    };

    const fetcheTotalLikes = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/liked-blogs`, { withCredentials: true });
            if (data.success) {
                setLikes(data.blogs);
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    const handleLikePost = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/add-like/${id}`, {}, { withCredentials: true })
            if (data.success) {
                toast.success(data.msg);
                fetcheTotalLikes();
            } else {
                toast.error(data.msg);
            }
        } catch (err) {
            toast.error(err.message);
        }
    }
    const handleUnLikePost = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/unlike/${id}`, {}, { withCredentials: true })
            if (data.success) {
                toast.success(data.msg);
                fetcheTotalLikes();
            } else {
                toast.error(data.msg)
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    const handleLikeCounts = () => {
        const likedBlogs = likes.filter((blog) => blog.blogId == id);
        setLikeCount(likedBlogs.length);
    }

    useEffect(() => {
        if (!isAuth) {
            navigate('/')
        }
    }, [isAuth]);

    useEffect(() => {
        handleLikeCounts();
    }, [likes, likeCount, user]);


    useEffect(() => {
        handleBlogData();
        fetcheTotalLikes();
        // handleRelatedPosts()
    }, [id]);

    return (
        <>
            {
                loading && (
                    <div className='flex items-center justify-center h-100 w-100vw'>
                        <Loader />
                    </div>
                )
            }
            {
                !loading && (
                    <div className='flex flex-col items-start mt-8 md:mt-12 z-40 quill-content a'>

                        <motion.div
                            initial={{ y: 15 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.5 }}
                            className='flex items-center gap-8 my-5'>
                            <h1 className='font-bold uppercase flex items-center gap-1 text-blue-600 text-sm'><MdEditSquare className='md:text-lg' /> {user?.id == blogData?.userId ? user?.username : 'Sathish'}</h1>
                            <p className='text-violet-600 font-semibold text-sm flex items-center gap-1'><BsCalendar2Date className='md:text-lg' /> {moment(blogData?.createdAt).format('DD  MMMM  YYYY')}</p>
                        </motion.div>
                        <motion.h1
                            initial={{ y: -15 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.5 }}
                            className='font-semibold text-2xl lg:text-3xl mb-5 text-wrap text-orange-600'>{blogData?.title}</motion.h1>
                        <div className='flex items-center gap-5 mb-5'>
                            {
                                blogData?.category?.map((c, i) => {
                                    return <button className='max-sm:text-sm font-semibold text-gray-600' key={i}>{c}</button>
                                })
                            }
                        </div>
                        <motion.div
                            initial={{ y: -15 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.5 }} >
                            <img src={blogData.posterUrl} alt={blogData?.title} className='rounded-md max-h-[50vh]' />
                        </motion.div>
                        <div className='flex items-start gap-5 mt-2'>
                            {
                                likes.map((item) => item.blogId).includes(id) && likes.map((item) => item.userId).includes(user.id) ? <button onClick={handleUnLikePost} className='cursor-pointer max-sm:text-sm font-semibold flex items-center gap-1  text-red-600'><RiHeartFill className='text-xl font-bold' />{likeCount} {likeCount?.length <= 1 ? 'like' : 'likes'}</button> :
                                    <button onClick={handleLikePost} className='cursor-pointer max-sm:text-sm font-semibold flex items-center gap-1'><RiHeartLine className='text-xl font-bold' />{likeCount} {likeCount <= 1 ? 'like' : 'likes'}</button>
                            }


                        </div>

                        <div className='mt-5'>
                            {/* <p className='font-bold text-lg'>Description:</p> */}
                            <div className='mt-2 max-sm:text-sm flex flex-col gap-3 quill-content-blog' dangerouslySetInnerHTML={{ __html: blogData?.description }}>

                            </div>
                        </div>

                    </div >

                )
            }
        </>
    )
}

export default SingleBlog;
