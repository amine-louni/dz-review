import { Router } from "express";
import express from 'express'
import { createDomain, getAllDomains } from "../controllers/domainController";
import { domainValidator } from "../middlewares/validators/domainValidator";
import { isAdmin, protect } from "../controllers/authController";



const router: Router = express.Router();


router.get('/', getAllDomains);
router.post('/', protect, isAdmin, domainValidator, createDomain);
router.patch('/:id', protect, isAdmin, domainValidator, createDomain);



export default router;