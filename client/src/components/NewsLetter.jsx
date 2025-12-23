import React from 'react'

const NewsLetter = () => {
    return (
        <div className='mt-20'>
            <h1 className='text-center text-xl md:text-2xl font-bold'>Subscribe to our Newsletter</h1>
            <p className='text-sm font-medium text-gray-700 tracking-wide mt-5 text-wrap max-w-sm text-center mx-auto'>Subscribe to our email newsletter to get the latest posts delivered right to your email.</p>
            <div className='flex items-center justify-center mt-12 border border-gray-700 max-w-md mx-auto rounded-md' >
                <input type="text" placeholder='Start typing...' className='rounded-md p-3 px-2 border-none outline-none w-full bg-gray-100 placeholder:text-gray-400 placeholder:font-medium placeholder:text-sm' />
                <button className='bg-gradient-to-tr from-gray-900 to-gray-800 text-white rounded-md font-semibold cursor-pointer w-fit h-full p-3
                '>Subscribe</button>
            </div>
        </div>
    )
}

export default NewsLetter
