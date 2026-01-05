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

const allowedOrigins = [
    "http://localhost:5173"
];

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api', authRoute);
app.use('/api', blogRoute)

app.get('/', (req, res) => {
    res.send('Api working...');
    res.send(process.env.CLIENT_URL)
})


app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})


export default app;