import { Router } from "express";
import { formSendData } from "../controllers/form.controller.js";



const router =  Router();


router.route("/contact").post(formSendData)

export default router;