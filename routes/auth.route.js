import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import { validationResults } from '../middlewares/validationResults.js';
const router = express.Router();



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
export default router;