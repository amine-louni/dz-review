import AppError from "../helpers/AppError";

import { catchAsync } from "../helpers/catchAsync";
import { Review } from "../entities/Review";
import { User } from "../entities/User";
import { Business } from "../entities/Business";
import { BAD_AUTH, BAD_INPUT } from "../constatns";



export const createReview = catchAsync(async (req, res, next) => {
    const { uuid } = req.params;
    const { body, currentUser } = req;

    const user = await User.findOne(currentUser?.uuid);
    const business = await Business.findOne(uuid).catch((_e) => {
        return next(new AppError('Business not found', 422, BAD_INPUT))
    });

    // Check if user is  has no posted review  about his business
    const alreadyReviewed = await Review.find({ where: { createdBy: user, business: business } })
    if (alreadyReviewed?.length > 0) {
        return next(new AppError('You have already posted review', 422, BAD_INPUT))
    }

    const review = Review.create({
        text: body.text,
        stars: body.stars,
        createdBy: user,
        business: business!
    })

    await review.save();

    return res.status(200).json({
        status: "success",
        data: review,
    })
})


export const getReviewsForBusiness = catchAsync(async (req, res, next) => {
    const { uuid } = req.params;


    const business = await Business.findOne(uuid);
    if (!business) {
        return next(new AppError('Business or user not found', 422, BAD_INPUT))
    }

    const reviews = await Review.find({ relations: ['createdBy'], where: { business: business } })


    return res.status(200).json({
        status: "success",
        count: reviews.length,
        data: reviews,
    })
})


export const updateReview = catchAsync(async (req, res, next) => {
    const { uuid } = req.params;
    const { currentUser } = req;


    const review = await Review.findOne(uuid, {
        relations: ['createdBy']
    });
    if (!review) {
        return next(new AppError('Review not found', 422, BAD_INPUT))
    }

    if (currentUser?.uuid !== review.createdBy.uuid) {
        return next(new AppError('You are not allowed to prefrom this action', 422, BAD_AUTH))
    }

    await Review.update(uuid, {
        ...req.body
    })

    const updatedReview = await Review.findOne(uuid)

    return res.status(200).json({
        status: "success",
        data: updatedReview,
    })
})