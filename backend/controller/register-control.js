import User from '../model/Users.js'
//import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
//import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
/*
const sendVerificationEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Email Verification',
      text: `Please verify your email by clicking the following link: ${process.env.CLIENT_URL}/verify-email?token=${token}`
    };
  
    await transporter.sendMail(mailOptions);
  };*/

export const Register = async (req,res)=>{
    try{
        //get all data from req body
        const {fullname, username, email, password} = req.body;
        console.log(req.body);
        //check if all data exists
        if(!(fullname && username && email && password)){
            return res.status(400).json({message: "Please fill all fields"});
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
          }
        //check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).send("User already exists");
        }
        //encrypt the password
        const hashPassword = bcrypt.hashSync(password, 10);

        //const verificationToken = crypto.randomBytes(32).toString('hex');
       // const verificationToken = 'test-verification';
        //save the user to the database
        const user = await User.create({
            fullname,
            username,
            email,
            password: hashPassword,
          //  verificationToken
        });

        //generate a token for user and send it
        const token = jwt.sign({id:user._id , email, role:user.role}, process.env.SECRET_KEY,{
            expiresIn: '1d'
        });
       // await sendVerificationEmail(email, verificationToken);

        user.password = undefined;
        res.status(201).json({
            message: "You have successfully registered!",
            user,
            token
        })

    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }

};
/*
export const verifyEmail = async (req, res) => {
    try {
      const { token } = req.query;
      if (!token) {
        return res.status(400).json({ message: "Invalid verification token" });
      }
  
      const user = await User.findOne({ verificationToken: token });
      if (!user) {
        return res.status(400).json({ message: "Invalid verification token" });
      }
  
      user.verified = true;
      user.verificationToken = undefined;
      await user.save();
  
      res.status(200).json({ message: "Email verified successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };*/