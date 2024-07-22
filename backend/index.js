import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import DBConnection from './database/userdb.js';
import router from './routes/routes.js';
import router2 from './routes/ContestRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:5179', // Your frontend's origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use(cookieParser());

DBConnection();

app.use('/', router);
app.use('/', router2);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
