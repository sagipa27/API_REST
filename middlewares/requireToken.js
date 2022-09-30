import jwt from 'jsonwebtoken';

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

        const tokenVerificationError = {
            'invalid signature': 'La firma de JWT no es valida',
            'jwt expired': 'JWT se ha expirado',
            'invalid token': 'Token no valido',
            'No Bearer': 'Usar formato Bearer',
            'jwt malformed': 'JWT formato no valido',
            'jwt must be provided': 'se debe enviar un JWT',
        };
        return res
            .status(401)
            .send({ error: tokenVerificationError[error.message] });
        //return res.status(401).json({ error: error.message });
    }
}