import { Router } from "express";
import express from 'express'
import { protect } from "../controllers/authController";
import { updateReview } from "../controllers/ReviewController";
import { updateReviewValidator } from "../middlewares/validators/reviewValidator";

const router: Router = express.Router();


router.patch('/:uuid', protect, updateReviewValidator, updateReview);


export default router;