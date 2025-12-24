import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { useContext } from 'react'
import AppContext from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SingleBlog from './pages/SingleBlog'
import Admin from './pages/Admin'
import AddBlog from './pages/AddBlog'
import ManageBlogs from './pages/ManageBlogs'
import LikedBlog from './pages/LikedBlog'
import { Toaster } from 'react-hot-toast';
import { IoCloseSharp } from 'react-icons/io5'
import SavedBlogs from './pages/SavedBlogs'

const App = () => {
  const { modal, setShowModal, setShowLogin } = useContext(AppContext);

  const location = useLocation();
  return (
    <div className='p-4 min-h-screen ' >
      <div className='max-w-6xl mx-auto'>
        {modal && (
          <div className='bg-violet-100 text-violet-600 w-full max-w-sm px-2 py-5 flex flex-col rounded-md items-center gap-5  z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <IoCloseSharp className='text-xl cursor-pointer self-end' onClick={() => (setShowModal(false))} />
            <h1 className='font-semibold text-center'>Please login to read blogs</h1>
            <button onClick={() => { setShowLogin(true), setShowModal(false) }} className='bg-violet-700 text-white cursor-pointer p-2 rounded-md text-sm font-medium'>Login</button>
          </div>
        )}
        <Navbar />
        <Toaster position="top-right"
          reverseOrder={false} />
        <Routes>
          <Route path='*' element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/blog/:id' element={<SingleBlog />} />
          <Route path='/saved-blogs' element={<SavedBlogs />} />
          <Route path='/admin' element={<Admin />} >
            <Route path='/admin/add-blog' element={<AddBlog />} />
            <Route path='/admin/manage-blogs' element={<ManageBlogs />} />
            <Route path='/admin/liked-blogs' element={<LikedBlog />} />
          </Route>
        </Routes>
        {!location.pathname.includes('/admin') && <Footer />}
      </div>
    </div >
  )
}

export default App
