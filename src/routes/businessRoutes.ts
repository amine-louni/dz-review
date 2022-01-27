import { Router } from "express";
import express from 'express'
import { createBusiness } from "../controllers/businessController";
import { createBusinesssValidator } from "../middlewares/validators/businessValidator";
import { protect } from "../controllers/authController";




const router: Router = express.Router();


router.post('/', protect, createBusinesssValidator, createBusiness)



export default router;