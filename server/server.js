import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoutes.js';
import blogRoute from './routes/blogRoute.js';
import cors from 'cors'
import { config } from 'dotenv';

const app = express();
config();
const PORT = 8000;


app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: process.env.VITE_CLIENT_URL, // or your deployed frontend URL
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api', authRoute);
app.use('/api', blogRoute)

app.get('/', (req, res) => {
    res.send('Api working...');
})


export default app;