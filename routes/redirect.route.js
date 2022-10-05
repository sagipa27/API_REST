import { Router } from "express";
import { redirectLink } from "../controllers/redirect.controller.js";
const router = Router();


router.get('/redirect/:nanoLink', redirectLink);

export default router; 