import { Router } from "express";
import express from 'express'
import { createBusiness, getBusinessesByDomainId, readAllBusinesses, readOneBusiness, updateBusiness } from "../controllers/businessController";
import { createBusinesssValidator, updateBusinesssValidator } from "../middlewares/validators/businessValidator";
import { protect } from "../controllers/authController";
import { createReview, getReviewsForBusiness } from "../controllers/ReviewController";
import { createReviewValidtaor } from "../middlewares/validators/reviewValidator";




const router: Router = express.Router();

// Reveiws
router.post('/:uuid/reviews', protect, createReviewValidtaor, createReview)
router.get('/:uuid/reviews', getReviewsForBusiness)


router.post('/', protect, createBusinesssValidator, createBusiness)
router.get('/:uuid', readOneBusiness)
router.get('/', readAllBusinesses)
router.patch('/:uuid', protect, updateBusinesssValidator, updateBusiness)

router.get('/domainId/:domainId', getBusinessesByDomainId)


export default router;