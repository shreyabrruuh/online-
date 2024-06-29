import express from 'express';
import { Register } from '../controller/register-control.js';
import { Login, logout } from '../controller/Login-control.js';
import { createProblem, updateProblem, deleteProblem, getAllProblems, getProblemById } from '../controller/problem-crud.js';

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.post('/logout', logout);

router.get('/problem', getAllProblems);
router.get('/problem/:id', getProblemById);

router.post('/problem', createProblem);
router.put('/problem/:id', updateProblem);
router.delete('/problem/:id', deleteProblem);

export default router;
