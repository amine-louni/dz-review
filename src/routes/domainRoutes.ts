import { Router } from "express";
import express from 'express'
import { createDomain } from "../controllers/domainController";
import { domainValidator } from "../middlewares/validators/domainValidator";



const router: Router = express.Router();


router.post('/', domainValidator, createDomain);



export default router;