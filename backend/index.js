import express from 'express';
const app= express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import DBConnection from './database/userdb.js';

import cookieParser from 'cookie-parser';;
import router from './routes/routes.js'
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, };
  
  app.use(cors(corsOptions));
app.use(cookieParser());



DBConnection();

app.use('/',router);

app.listen(8000, ()=>{
    console.log('server is running on port 8000');
});