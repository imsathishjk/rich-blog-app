import React from 'react'
import { useContext } from 'react'
import AppContext from '../context/AppContext'
import Login from '../components/Login'
import Hero from '../components/Hero'
import AllBlogs from '../components/AllBlogs'
import NewsLetter from '../components/NewsLetter'
import { IoCloseSharp } from "react-icons/io5";

const Home = () => {
    const { showLogin, modal } = useContext(AppContext);
    return (
        <div className='relative'>
            {showLogin && !modal && (<Login />)}
            <Hero />
            <AllBlogs />
            <NewsLetter />
        </div>
    )
}

export default Home
