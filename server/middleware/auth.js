import jwt from 'jsonwebtoken'
export const authMiddleWare = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.json({ success: false, msg: 'Not authorized Login Again!' })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id;
        next();
    } catch (err) {
        console.log(err)
    }
}