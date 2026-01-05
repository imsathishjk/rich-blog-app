import React from 'react'
import { SiOpensearch } from 'react-icons/si';
import { FaInstagram } from "react-icons/fa";
import { RiHomeSmile2Line } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";



const Footer = () => {
    return (
        <div className='mt-32 py-1 border-t-2 border-t-gray-200'>
            <div className='flex justify-between flex-wrap gap-2'>
                <ul className='flex gap-5'>
                    <li className='font-semibold max-sm:text-sm cursor-pointer flex items-center gap-1'><RiHomeSmile2Line className='text-lg' />Home</li>
                    <li className='font-semibold max-sm:text-sm cursor-pointer flex items-center gap-1'><FaInstagram /></li>
                    <li className='font-semibold max-sm:text-sm cursor-pointer flex items-center gap-1'><FaXTwitter /></li>
                    <li className='font-semibold max-sm:text-sm cursor-pointer flex items-center gap-1'><FaLinkedin /></li>
                </ul>
                <h1 className='text-2xl font-bold flex items-center gap-1'><SiOpensearch className='mt-1' /> Rich</h1>
            </div>

            <p className='font-bold text-gray-800 text-sm text-center my-3'>© {new Date().getFullYear()} — Revision. All Rights Reserved.</p>
        </div>
    )
}

export default Footer;
