import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
const router = express.Router();

router.post("/login", login);

router.post("/register", [
    body('email', 'Formato de Email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'Formato de password incorrecto')
        .trim()
        .isLength({ min: 6 })
        .custom((value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error('No coinciden el password con previamente introducido')
            }
        })
],
    register);

export default router;