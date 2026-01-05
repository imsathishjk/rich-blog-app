import { prisma } from "../config/db.js";
import { uploadToCloudinary } from "../middleware/streamifier.js";

export const addBlog = async (req, res) => {
    try {
        const admin = 'sksathish0715@gmail.com';
        const userId = req.userId;
        const isValidUser = await prisma.user.findUnique({ where: { id: userId } });
        const isAdmin = isValidUser.email == admin;
        if (!isAdmin) {
            return res.json({ success: false, msg: 'Admin can only add blogs' });
        }
        const { title, description, category } = req.body;
        const image = req.file;
        const posterUrl = await uploadToCloudinary(image, 'image');
        if (!title || !description || !posterUrl || !category) {
            return res.json({ success: false, msg: 'All fields are required to add blog!' })
        }
        const newBlog = await prisma.blogs.create({
            data: { title, description, posterUrl, category: JSON.parse(category), userId: userId }
        });

        return res.json({ success: true, msg: 'Blog added successfully', blog: newBlog });
    } catch (err) {
        console.log(err)
        return res.json({ success: false, msg: 'Error in adding blog', err })
    }
}


export const fetchBlogs = async (req, res) => {
    try {
        const blogs = await prisma.blogs.findMany({})
        return res.json({ success: true, msg: 'Blogs fetched successfully', blogs: blogs })
    } catch (err) {
        res.json({ success: false, msg: err.message })
    }
}


export const handleSingleBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const isBlogExist = await prisma.blogs.findUnique({ where: { id: blogId } });
        if (!isBlogExist) {
            return res.json({ success: false, msg: 'blog not found' })
        }
        const blog = await prisma.blogs.findUnique({ where: { id: blogId } });
        return res.json({ success: true, msg: 'blog fetched', blog: blog });
    } catch (err) {
        res.json({ success: false, msg: err.message })
    }
}


export const handleLike = async (req, res) => {
    try {
        const userId = req.userId;
        const blogId = req.params.id;
        const isBlogExist = await prisma.blogs.findUnique({ where: { id: blogId } });
        if (!isBlogExist) {
            return res.json({ success: false, msg: 'blog not found' })
        }

        const isAlreadyLiked = await prisma.blogLikes.findUnique({ where: { userId_blogId: { userId, blogId } } })

        if (isAlreadyLiked) {
            return res.json({ success: false, msg: 'Blog already liked by user' });
        } else {
            await prisma.blogLikes.create({
                data: { userId: userId, blogId: blogId }
            });
            isBlogExist.likes = isBlogExist.likes + 1;
            await prisma.blogs.update({ where: { id: blogId }, data: isBlogExist });
            return res.json({ success: true, msg: 'Blog liked', isBlogExist });
        }

    } catch (err) {
        return res.json({ success: false, msg: err.message })
    }
}


export const handleUnlike = async (req, res) => {
    try {
        const userId = req.userId;
        const blogId = req.params.id;
        const isBlogExist = await prisma.blogs.findUnique({ where: { id: blogId } });
        if (!isBlogExist) {
            return res.json({ success: false, msg: 'blog not found' })
        };
        const isAlreadyLiked = await prisma.blogLikes.findUnique({ where: { userId_blogId: { userId, blogId } } });
        if (!isAlreadyLiked) {
            return res.json({ isAlreadyLiked });
        }
        isBlogExist.likes != 0 ? isBlogExist.likes = isBlogExist.likes - 1 : isBlogExist.likes = 0;
        await prisma.blogs.update({
            where: { id: blogId },
            data: isBlogExist
        });
        await prisma.blogLikes.delete({ where: { userId_blogId: { userId, blogId } } })
        return res.json({ success: true, msg: 'Blog Unliked', data: isBlogExist })

    } catch (err) {
        return res.json({ success: false, msg: err.message })
    }
}

export const handleFetchLikedBlogs = async (req, res) => {
    const likedBlogs = await prisma.blogLikes.findMany({});
    return res.json({ success: true, msg: 'Liked Blogs fetched', blogs: likedBlogs });
}
export const handleSaveBlog = async (req, res) => {
    try {
        const userId = req.userId;
        const { blogId } = req.params;
        const blog = await prisma.blogs.findUnique({ where: { id: blogId } });
        if (!blog) {
            return res.json({ success: false, msg: 'Blog not found' });
        }
        const isSaved = await prisma.saveBlog.findUnique({ where: { userId_blogId: { userId, blogId } } });
        if (!isSaved) {
            const savedBlog = await prisma.saveBlog.create({
                data: {
                    userId: userId, blogId: blogId
                }
            })
            return res.json({ success: true, msg: 'Blog Saved', data: savedBlog })
        }

        return res.json({ success: false, msg: 'Blog Already Saved' });
    } catch (err) {
        return res.json({ success: false, message: err.message })
    }

}

export const fetchSavedBlogs = async (req, res) => {
    try {
        const savedBlogs = await prisma.saveBlog.findMany({});
        return res.json({ success: true, msg: 'Saved Blogs fetches', data: savedBlogs })
    } catch (err) {
        return res.json({ success: false, msg: err.message });
    }
}

export const handleRemoveSavedBlog = async (req, res) => {
    try {
        const userId = req.userId;
        const { blogId } = req.params;
        const isRemoved = await prisma.saveBlog.delete({ where: { userId_blogId: { userId, blogId } } });
        if (isRemoved) {
            return res.json({ success: true, msg: 'Blog removed' })
        }
        return res.json({ success: false, msg: 'Something went wrong' })
    } catch (err) {
        return res.json({ success: false, msg: err.message })
    }
}

export const handleDeleteBlog = async (req, res) => {
    try {

        const { blogId } = req.params;
        const isBlogExist = await prisma.blogs.findUnique({ where: { id: blogId } });
        if (!isBlogExist) {
            return res.json({ success: false, msg: 'Blog is not found' })
        }
        const isDeleted = await prisma.blogs.delete({ where: { id: blogId } });
        if (isDeleted) {
            return res.json({ success: true, msg: 'Blog Deleted' })
        }
        return res.json({ success: false, msg: 'Something went wrong' })
    } catch (err) {
        return res.json({ success: false, msg: err.message })
    }
}