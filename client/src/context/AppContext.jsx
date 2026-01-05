import { useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from "react-hot-toast";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const [author, setAuthor] = useState();
    const [savedBlogs, setSavedBlogs] = useState([]);
    const [filterUserSavedBlogs, setFilteredUserSavedBlogs] = useState([]);

    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log(backendUrl)
    const handleUserData = async () => {
        const { data } = await axios.get(`${backendUrl}/api/user`, { withCredentials: true });
        if (data.success) {
            setUser(data.data);
            if (data.data.email === 'sksathish0715@gmail.com') {
                setIsAdmin(true);
            }
        }

    }

    const isAuthenticate = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/is-auth`, { withCredentials: true });
            if (data.success && data.isAuth) {
                setIsAuth(true);
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/all-blogs`);
            if (data.success) {
                setBlogs(data.blogs);
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    const fetchSavedBlogs = async () => {
        const { data } = await axios.get(`${backendUrl}/api/saved-blogs`, { withCredentials: true });
        if (data.success) {
            setSavedBlogs(data.data);
        }
    }



    const handleUserSavedBlogs = () => {
        const data = blogs.filter((blog) => savedBlogs.some((item) => blog.id == item.blogId && item.userId == user?.id));
        setFilteredUserSavedBlogs(data);
    }




    useEffect(() => {
        fetchBlogs();
        handleUserData()
        isAuthenticate();
        fetchSavedBlogs();
    }, []);
    useEffect(() => {
        handleUserSavedBlogs();
    }, [user, isAuth, savedBlogs]);


    const value = {
        showLogin, setShowLogin, navigate, blogs, backendUrl, user, handleUserData, setUser, isAdmin, setIsAdmin, isAuth,
        author, setAuthor, setIsAuth, savedBlogs, filterUserSavedBlogs, fetchSavedBlogs,
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}


export default AppContext;