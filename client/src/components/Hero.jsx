import React, { useContext } from 'react';
import { PiLaptopFill } from "react-icons/pi";
import { GiCommercialAirplane } from "react-icons/gi";
import { MdSportsBaseball } from "react-icons/md";
import { BiSolidRadio } from "react-icons/bi";
import { BsFillBarChartFill } from "react-icons/bs";
import { FaFireAlt } from "react-icons/fa";
import { PiTelevisionFill } from "react-icons/pi";
import { PiNewspaperClippingFill } from "react-icons/pi";
import {motion} from 'motion/react'
const Hero = () => {

    return (
        <motion.div
            initial={
                { opacity: 0 }
            }
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            
            className='mt-12 md:mt-20 lg:mt-32'>

            <h1 className='text-center text-wrap text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold max-w-4xl mx-auto select-none'>Heartfelt Reflections: Stories of Love, <br />Loss, and Growth</h1>
            <p className='max-sm:text-sm font-medium text-center text-gray-700 tracking-wide mt-8 text-wrap max-w-xl mx-auto select-none'>We Welcomes to ultimate source for fresh perspectives! Explore curated content to enlighten, entertain and engage global readers.</p>
            <div className='mt-20 max-w-4xl mx-auto'>
                <p className='text-center text-gray-800 font-semibold uppercase text-sm select-none'>Explore Trending Topics</p>
                <div className='flex flex-wrap mt-12 justify-center gap-6 md:gap-8 text-white'>
                    <div className='flex items-center gap-2 rounded-full bg-gray-800 font-semibold md:text-lg p-2 md:p-4 '>
                        <PiLaptopFill className='text-blue-400 text-lg md:text-xl' />
                        <p className='select-none'>Technology</p>
                    </div>
                    <div className='flex items-center gap-2 rounded-full bg-gray-800 font-semibold md:text-lg cursor-pointer p-2 md:p-4'>
                        <GiCommercialAirplane className='text-orange-400 text-lg md:text-xl' />
                        <p className='select-none'>Travel</p>
                    </div>
                    <div className='flex items-center gap-2 rounded-full bg-gray-800 font-medium md:text-lg cursor-pointer p-2 md:p-4'>
                        <MdSportsBaseball className='text-red-600 text-lg md:text-xl' />
                        <p className='select-none'>Sports</p>
                    </div>
                    <div className='flex items-center gap-2 rounded-full bg-gray-800 font-semibold md:text-lg cursor-pointer p-2 md:p-4'>
                        <BiSolidRadio className='text-lime-400 text-lg md:text-xl' />
                        <p className='select-none'>Business</p>
                    </div>
                    <div className='flex items-center gap-2 rounded-full bg-gray-800 font-semibold md:text-lg cursor-pointer p-2 md:p-4'>
                        <BsFillBarChartFill className='text-green-500 text-lg md:text-xl' />
                        <p className='select-none'>Management</p>
                    </div>
                    <div className='flex items-center gap-2 rounded-full bg-gray-800 font-semibold md:text-lg cursor-pointer p-2 md:p-4'>
                        <FaFireAlt className='text-yellow-400 text-lg md:text-xl' />
                        <p className='select-none'>Trends</p>
                    </div>
                    <div className='flex items-center gap-2 rounded-full bg-gray-800 font-semibold md:text-lg cursor-pointer p-2 md:p-4'>
                        <PiTelevisionFill className='text-pink-500 text-lg md:text-xl' />
                        <p className='select-none'>Startups</p>
                    </div>
                    <div className='flex items-center gap-2 rounded-full bg-gray-800 font-semibold md:text-lg cursor-pointer p-2 md:p-4'>
                        <PiNewspaperClippingFill className='text-cyan-400 text-lg md:text-xl' />
                        <p className='select-none'>News</p>
                    </div>
                </div>
            </div>

        </motion.div>
    )
}

export default Hero
