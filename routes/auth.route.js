
import express from 'express';
import { infouser, login, register, refreshToken, logout } from '../controllers/auth.controller.js';

import { validationResults } from '../middlewares/validationResults.js';
import { requireToken } from '../middlewares/requireToken.js';
import { requireRefreshToken } from '../middlewares/requireRefreshToken.js';
import { bodyLoginValidator, bodyRegisterValidator } from '../middlewares/validatorManager.js';


const router = express.Router();


//Ruta para registro
router.post("/register", bodyRegisterValidator, register);

//Ruta para login 
router.post("/login", bodyLoginValidator, login);

router.get('/protected', requireToken, infouser);

router.get('/refresh', requireRefreshToken, refreshToken);

router.get('/logout', logout);
export default router;