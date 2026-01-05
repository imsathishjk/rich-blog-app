import React, { useContext, useEffect, useState } from 'react'
import { RiDeleteBin7Fill } from "react-icons/ri";
import axios from 'axios';
import AppContext from '../context/AppContext';
import moment from 'moment';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import {motion} from 'motion/react'

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const { backendUrl } = useContext(AppContext)


    const handleManageBlogs = async () => {
        const { data } = await axios.get(`${backendUrl}/api/all-blogs`);
        if (data.success) {
            setBlogs(data.blogs);
        }
    }

    const handleDeleteBlog = async (id) => {
        try {
            const { data } = await axios.delete(`${backendUrl}/api/delete-blog/${id}`, { withCredentials: true })
            if (data.success) {
                toast.success(data.msg)
            } else {
                toast.error(data.msg);
            }
        } catch (err) {
            toast.error(err.message);
        }
    }


    useEffect(() => {
        handleManageBlogs();
    }, [blogs]);
    return (
        <div className='border-l border-l-gray-500 px-4 md:px-8'>
            {!blogs.length && (<Loader />)}
            <div className='w-full flex flex-col gap-5'>
                {
                    blogs.map((data, i) => {
                        return <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}

                            key={data.id} className='flex flex-col gap-2'>
                            <h1 className='font-semibold'><span>{i + 1} .</span> {data.title}</h1>
                            <div className='flex max-sm:flex-col items-center justify-between gap-5 my-3 bg-transparent border border-gray-600 rounded-md p-1.5'>
                                <img src={data.posterUrl} alt={data.title} className='max-sm:w-full w-12 object-cover rounded-md max-sm:h-32' />
                                <div className='max-sm:hidden md:flex justify-between gap-2'>
                                    {
                                        data.category.map((c, i) => {
                                            return <p className='text-sm font-medium text-gray-600' key={i}><span>Categories:</span> {c}</p>
                                        })
                                    }
                                </div>
                                <p>Posted On: {moment(data.createdAt).format('DD-MM-YY')}</p>
                                <button onClick={() => handleDeleteBlog(data.id)} className='text-xl text-orange-600 cursor-pointer'><RiDeleteBin7Fill /></button>
                            </div>
                        </motion.div>
                    })
                }
            </div>

        </div>
    )
}

export default ManageBlogs
