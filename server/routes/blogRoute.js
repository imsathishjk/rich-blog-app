import express from 'express';
import { addBlog, fetchBlogs, fetchSavedBlogs, handleDeleteBlog, handleFetchLikedBlogs, handleLike, handleRemoveSavedBlog, handleSaveBlog, handleSingleBlog, handleUnlike } from '../controllers/blogControllers.js';
import { authMiddleWare } from '../middleware/auth.js';
import { upload } from '../middleware/multer.js';

const blogRoute = express.Router();

blogRoute.post('/add-blog', authMiddleWare, upload.single('image'), addBlog);
blogRoute.get('/all-blogs', fetchBlogs);
blogRoute.get('/single-blog/:id', authMiddleWare, handleSingleBlog);



blogRoute.post('/add-like/:id', authMiddleWare, handleLike);
blogRoute.post('/unlike/:id', authMiddleWare, handleUnlike);
blogRoute.get('/liked-blogs', authMiddleWare, handleFetchLikedBlogs);


blogRoute.post('/save-blog/:blogId', authMiddleWare, handleSaveBlog);
blogRoute.get('/saved-blogs', authMiddleWare, fetchSavedBlogs);
blogRoute.post('/remove-saved-blog/:blogId', authMiddleWare, handleRemoveSavedBlog);
blogRoute.delete('/delete-blog/:blogId', authMiddleWare,handleDeleteBlog);

export default blogRoute;