import { Router } from "express";
import express from 'express'
import { createDomain } from "../controllers/domainController";
import { domainValidator } from "../middlewares/validators/domainValidator";
import { protect } from "../controllers/authController";



const router: Router = express.Router();


router.post('/', protect, domainValidator, createDomain);
router.patch('/:id', protect, domainValidator, createDomain);



export default router;