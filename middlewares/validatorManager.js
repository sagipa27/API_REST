import { validationResult, body, param } from "express-validator";
import axios from "axios";
import { infouser } from "../controllers/auth.controller.js";

export const validationResults = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

export const bodyLinkValidator = [
    body("longLink", "formato link incorrecto")
        .trim()
        .notEmpty()
        .custom(async (value) => {
            try {
                if (!value.startsWith("https://")) {
                    value = "https://" + value;
                }
                await axios.get(value);
                return value;
            } catch (error) {
                // console.log(error);
                throw new Error("not found longlink 404");
            }
        }),
    validationResults,
];

export const paramLinkValidator = [
    param("id", "Formato no valido (expressValidator)")
        .trim()
        .notEmpty()
        .escape(),
    validationResults
]
export const bodyRegisterValidator = [
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
    validationResults
]

export const bodyLoginValidator = [
    body('email', 'Formato de Email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'Minimo 6 caracteres de password')
        .trim()
        .isLength({ min: 6 }),
    validationResults
];