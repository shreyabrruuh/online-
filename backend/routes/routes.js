import express from 'express';
import { forgotpassword , resetpassword } from '../controller/auth-role.js';
import { authMiddleware } from '../utils/auth-middelware.js';
import User from '../model/Users.js';
import { Register } from '../controller/register-control.js';
import { Login, logout } from '../controller/Login-control.js';
import { createProblem, updateProblem, deleteProblem, getAllProblems, getProblemById } from '../controller/problem-crud.js';
import { saveCode, getCode } from '../controller/codeController.js';
import { submitCode, submitContestCode, submitControl, createSubmission } from '../controller/submissionController.js';

const router = express.Router();

// Auth routes
router.post('/register', Register);
router.post('/login', Login);
router.post('/logout', logout);
router.post('/forgot-password', forgotpassword);
router.post('/reset-password/:id/:token', resetpassword);

// Code submission routes
router.post('/submission', createSubmission);
router.get('/submission/:id', submitControl);
router.post('/submit', submitCode);
router.post('/Contestsubmit', submitContestCode);

// User route
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('username role');
    console.log(user);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Code routes
router.post('/save', saveCode);
router.get('/code/get/:id', getCode);

// Problem routes
router.get('/api/problems', getAllProblems); // Adjusted to match frontend request
router.get('/api/problems/:id', getProblemById); // Adjusted to match frontend request
router.post('/api/problems', createProblem); // Adjusted to match frontend request
router.put('/api/problems/:id', updateProblem); // Adjusted to match frontend request
router.delete('/api/problems/:id', deleteProblem); // Adjusted to match frontend request

export default router;
