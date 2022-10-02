import jwt from 'jsonwebtoken';

export const generateToken = (uid) => {
    const expiresIn = 60 * 15;
    try {
        const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: expiresIn });


        return { token, expiresIn }
    } catch (error) {
        console.log(error);
    }
};

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30;
    try {
        const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, { expiresIn: expiresIn });


        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === 'developer'),
            expires: new Date(Date.now() + expiresIn * 1000)
        });


    } catch (error) {
        console.log(error);

    }
};

export const tokenVerificationError = {
    'invalid signature': 'La firma de JWT no es valida',
    'jwt expired': 'JWT se ha expirado',
    'invalid token': 'Token no valido',
    'No Bearer': 'Usar formato Bearer',
    'jwt malformed': 'JWT formato no valido',
    'jwt must be provided': 'se debe enviar un JWT',
};