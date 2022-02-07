import { Router } from "express";
import express from 'express'
import { protect } from "../controllers/authController";
import { updateReview } from "../controllers/ReviewController";

const router: Router = express.Router();


router.patch('/:uuid', protect, updateReview);


export default router;