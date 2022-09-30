
import express from 'express';
import { infouser, login, register, refreshToken } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import { validationResults } from '../middlewares/validationResults.js';
import { requireToken } from '../middlewares/requireToken.js';


const router = express.Router();


//Ruta para registro
router.post("/register", [
    body('email', 'Formato de Email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'Minimo 6 caracteres de password')
        .trim()
        .isLength({ min: 6 }),
    body('password', 'Formato de password incorrecto')
        .custom((value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error('No coinciden el password con previamente introducido')
            }
            return value;
        }
        ),
], validationResults,
    register
);

//Ruta para login 
router.post("/login", [
    body('email', 'Formato de Email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'Minimo 6 caracteres de password')
        .trim()
        .isLength({ min: 6 }),
], validationResults,
    login

);

router.get('/protected', requireToken, infouser);

router.get('/refresh', refreshToken)
export default router;