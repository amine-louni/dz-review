import { Router } from "express";
import express from 'express'
import { protect } from "../controllers/authController";
import { updateReview } from "../controllers/ReviewController";
import { createReviewValidtaor } from "../middlewares/validators/reviewValidator";

const router: Router = express.Router();


router.patch('/:uuid', protect, createReviewValidtaor, updateReview);


export default router;