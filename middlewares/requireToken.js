import jwt from 'jsonwebtoken';
import { tokenVerificationError } from '../utils/tokenManager.js';

//middleware para validar autorizacion por medio de token

export const requireToken = (req, res, next) => {
    try {

        let token = req.headers?.authorization;


        if (!token) throw new Error("No Bearer");


        token = token.split(" ")[1];
        console.log(token);
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;

        next();
    } catch (error) {

        console.log(error.message);


        return res
            .status(401)
            .send({ error: tokenVerificationError[error.message] });
        //return res.status(401).json({ error: error.message });
    }
}