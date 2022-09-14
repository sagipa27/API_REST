import { user } from '../models/User.js';

export const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new user(email, password);
    } catch (error) {
        console.log(error);
    }
};

export const login = async (req, res) => {

    res.json({ ok: "Login" });
};

