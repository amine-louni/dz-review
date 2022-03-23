import { Router } from "express";
import express from 'express'
import { createBusiness, followBusiness, getBusinessesByDomainId, readAllBusinesses, readOneBusiness, unFollowBusiness, updateBusiness } from "../controllers/businessController";
import { createBusinesssValidator, updateBusinesssValidator } from "../middlewares/validators/businessValidator";
import { protect } from "../controllers/authController";
import { createReview, getReviewsForBusiness } from "../controllers/reviewController";
import { createReviewValidtaor } from "../middlewares/validators/reviewValidator";




const router: Router = express.Router();

// Reveiws
router.post('/:uuid/reviews', protect, createReviewValidtaor, createReview)
router.get('/:uuid/reviews', getReviewsForBusiness)

// Following
router.patch('/:uuid/follows', protect, followBusiness)
router.patch('/:uuid/unfollows', protect, unFollowBusiness)


router.post('/', protect, createBusinesssValidator, createBusiness)
router.get('/:uuid', readOneBusiness)
router.get('/', readAllBusinesses)
router.patch('/:uuid', protect, updateBusinesssValidator, updateBusiness)

router.get('/domainId/:domainId', getBusinessesByDomainId)


export default router;