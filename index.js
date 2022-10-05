import * as dotenv from 'dotenv';
dotenv.config();
import "./database/connectDB.js";
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import linkRouter from './routes/link.router.js';
import redirectRouter from './routes/redirect.route.js';

const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2]

/*app.use(cors({
    origin: function (origin, callback) {
        if (!origin || whiteList.includes(origin)) {
            return callback(null, origin);
        }
        return callback("Error de CORS origin: " + origin + "no autorizado!");
    },
}));
*/

app.use(cookieParser());
app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/links', linkRouter);
app.use('/', redirectRouter)
//Para probar ejemplo de Login/Token
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('listening on port ' + PORT));



