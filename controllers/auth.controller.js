import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = new User({ email, password });
        await user.save();

        //Generar JWT token

        return res.status(201).json({ ok: true });
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Ya existe este usuario' });
        }
        return res.status(500).json({ error: 'Error de servidor' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //Se valida si el email existe en la BD
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ error: 'El usuario no ha sido encontrado' });
        }
        //Se compara la contraseña hasheada por medio de Bcryptjs
        const respuestaPassword = await user.comparePassword(password);
        if (!respuestaPassword) {
            return res.status(403).json({ error: 'Password incorrecto' });
        }

        //Generar JWT token
        const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET);


        return res.json({ token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error de servidor' });
    }

};

