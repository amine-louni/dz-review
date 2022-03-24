import { Router } from "express";
import express from 'express'
import { uploadFile } from "../controllers/mediaController";
import uploadCloud from "../middlewares/uploadCloud";


const router: Router = express.Router();
router.post('/', uploadCloud, uploadFile);

export default router;