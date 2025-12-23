import React, { useContext, useRef, useState } from 'react'
import user_icon from '../assets/user icon.png';
import { IoClose } from "react-icons/io5";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import AppContext from '../context/AppContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { motion, animate } from 'motion/react'

const AddBlog = () => {
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState([]);
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const { backendUrl, navigate } = useContext(AppContext);
    const imageRef = useRef()

    const handleCategory = (e) => {
        const value = e.target.value;
        setCategory((category) => [...category.filter((c) => c !== value), value]);
    }

    const handleRemoveCategory = (c) => {
        let value = category.filter((category) => category !== c)
        setCategory(value);
    }

    const handleImage = (e) => {
        setImage(e.target.files[0]);

    }
    const handleAddBlog = async (e) => {
        setLoading(true);
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', value);
            formData.append('category', JSON.stringify(category));
            formData.append('image', image);
            const { data } = await axios.post(`${backendUrl}/api/add-blog`, formData, { withCredentials: true });
            if (data.success) {
                toast.success(data.msg);
                setLoading(false);
                navigate('/admin/manage-blogs', scrollTo(0, 0))
                setValue('');
                setTitle('');
                setCategory([]);
                setImage('');
                // imageRef.current.value = ''

            } else {
                toast.error(data.msg);
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <>
            {
                loading && (
                    <div className='flex items-center justify-center h-full w-full'>
                        <Loader />
                    </div>
                )
            }
            {
                !loading && (
                    <motion.form
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5}}
                        onSubmit={handleAddBlog} className='flex flex-col gap-5 md:gap-8 border-l border-l-gray-500 px-4 md:px-8'>
                        <div className=''>
                            <h1 className='mb-5 md:text-lg text-orange-500 font-semibold'>Blog Title</h1>
                            <input required value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title here' className='w-full py-3 px-2 outline-none border border-gray-700 rounded-md placeholder:text-sm' />
                        </div>
                        <div>
                            <h1 className='mb-5 md:text-lg text-orange-500 font-semibold'>Blog Description</h1>
                            <ReactQuill className='' theme="snow" value={value} onChange={setValue} />
                        </div>
                        <div>
                            <h1 className='my-8 md:text-lg text-orange-500 font-semibold'>Blog Category</h1>
                            <select required onChange={handleCategory} name="" id="" className='border border-gray-700 p-3 rounded-md bg-gray-100 text-gray-900 text-sm font-medium'>
                                <option value="">--</option>
                                <option className='text-sm font-medium' value="TECHNOLOGY">TECHNOLOGY</option>
                                <option className='text-sm font-medium' value="NEWS">NEWS</option>
                                <option className='text-sm font-medium' value="SPORT">SPORT</option>
                                <option className='text-sm font-medium' value="TRENDINGS">TRENDINGS</option>
                                <option className='text-sm font-medium' value="BUSINESS">BUSINESS</option>
                                <option className='text-sm font-medium' value="STARTUPS">STARTUPS</option>
                                <option className='text-sm font-medium' value="TRAVEL">TRAVEL</option>
                            </select>
                        </div>
                        <div className='flex gap-5 flex-wrap'>
                            {
                                category.length >= 1 && category?.map((c, i) => {
                                    return <p key={i} className='text-[12px] font-medium text-violet-200 flex items-center gap-0.5 bg-gray-900 rounded-md p-1.5 border border-gray-700'>{c} <IoClose className='cursor-pointer text-lg' onClick={() => handleRemoveCategory(c)} /></p>
                                })
                            }
                        </div>
                        <div className='text-sm font-medium text-orange-400'>
                            <input ref={imageRef} required accept='*/jpg/png' type="file" id='file' className='border border-gray-600 p-3 w-52 rounded-md' onChange={handleImage} />
                            <img src={image ? URL.createObjectURL(image) : user_icon} alt="file-upload" id='file' className='w-12 md:w-16 rounded mt-3' typeof='file' />
                        </div>
                        <button type='submit' className='bg-gradient-to-br from-orange-400 to-orange-500 text-black font-semibold cursor-pointer rounded-md p-2 md:p-3 w-32'>Add</button>
                    </motion.form>
                )
            }
        </>
    )
}

export default AddBlog
