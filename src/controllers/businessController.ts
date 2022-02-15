
import AppError from "../helpers/AppError";
import { Business } from "../entities/Business";
import { catchAsync } from "../helpers/catchAsync";
import { BAD_INPUT, NOT_AUTHORIZED, SERVER_ERROR } from "../constatns";
import { Domain } from "../entities/Domain";
import { In } from "typeorm";
import { User } from "../entities/User";
import { NOTFOUND } from "dns";





export const createBusiness = catchAsync(async (req, res, next) => {

    const { name, about, state, city, googleMapsUrl, phone, website, domains, email } = req.body;

    // check if domain exists
    const theDomains = await Domain.find({
        where: {
            uuid: In(domains)
        }
    }).catch(e => console.error(e));

    const newBusinessRes = await Business.create({
        name,
        about,
        state,
        city,
        googleMapsUrl,
        phone,
        website,
        domains,
        email,

    });

    if (!theDomains) {
        return next(new AppError('Invalid domain list', 422, BAD_INPUT))
    }

    const createdByUser = await User.findOneOrFail(req.currentUser?.uuid).catch((e) => next(new AppError(`the user not found: ${e}`, 404, NOTFOUND)))

    newBusinessRes.domains = theDomains;
    newBusinessRes.createdBy = createdByUser!;

    const newBusiness = await newBusinessRes.save();

    return res.status(201).json({
        status: "success",
        data: {
            ...newBusiness,
        },
    })
})

export const updateBusiness = catchAsync(async (req, res, next) => {
    const { uuid } = req.params
    const { name, about, state, city, googleMapsUrl, phone, website, domains, email, claimedByOwner } = req.body;
    const isAdmin = req.currentUser?.role !== 'admin';

    // check if exiits
    const business = await Business.findOne(uuid, {
        relations: ['createdBy']
    }).catch((e) => next(new AppError(`Error while finding the business: ${e}`, 500, SERVER_ERROR)))


    if (!business) {
        return next(new AppError('Business not found', 404))
    }

    // check if currentUser is the owner
    if (business.createdBy.uuid !== req.currentUser?.uuid || !isAdmin) {
        return next(new AppError('You are not allowed to prefrom this action', 403, NOT_AUTHORIZED))
    }

    const updated = await Business.update(uuid, {
        name,
        about,
        state,
        city,
        googleMapsUrl,
        phone,
        website,
        domains,
        email,
        claimedByOwner: (isAdmin ? claimedByOwner : undefined)
    }).catch((e) => {
        console.error('Error while updating', e);
    });

    if (!updated) {
        return next(new AppError('Error while updating', 505))
    }
    const updatedBusiness = await Business.findOne(uuid);

    return res.status(201).json({
        status: "success",
        data: {
            ...updatedBusiness,
        },
    })
})


export const readOneBusiness = catchAsync(async (req, res, next) => {
    const { uuid } = req.params
    // check if exiits
    const business = await Business.findOne(uuid, {
        relations: ['createdBy', 'followers']
    });

    if (!business) {
        return next(new AppError('Business not found', 404))
    }

    return res.json({
        status: "success",
        data: {
            ...business,
        },
    })
})

export const readAllBusinesses = catchAsync(async (_req, res, _next) => {

    const businesses = await Business.find({
        relations: ['domains']
    });

    return res.json({
        status: "success",
        data: [
            ...businesses
        ],
    })
})


export const getBusinessesByDomainId = catchAsync(async (req, res, _next) => {
    const { domainId } = req.params;

    const businesses = await Business.find({
        where: { domains: In([domainId]) }
    });
    return res.json({
        status: "success",
        data: [
            ...businesses
        ],
    })
})


// following sys
export const followBusiness = catchAsync(async (req, res, next) => {
    const { uuid } = req.params
    // check if exiits
    const business = await Business.findOne(uuid, {
        relations: ['followers']
    }).catch((e) => next(new AppError(`Error while finding the business: ${e}`, 500, SERVER_ERROR)));


    if (!business) {
        return next(new AppError('Business not found', 404))
    }

    if (business?.followers.filter(follower => follower.uuid === req.currentUser?.uuid).length > 0) {
        return next(new AppError('Already a fallower', 422, BAD_INPUT))
    }
    const user = await User.findOne(req?.currentUser?.uuid).catch((e) => next(new AppError(`Error while finding the business: ${e}`, 500, SERVER_ERROR)))


    if (!user) {
        return next(new AppError('User not found', 404))
    }

    business.followers.push(user);

    await business.save()

    if (!business) {
        return next(new AppError('Error while updating', 505))
    }

    return res.status(201).json({
        status: "success",
        data: {
            ...business,
        },
    })
})

export const unFollowBusiness = catchAsync(async (req, res, next) => {
    const { uuid } = req.params
    // check if exiits
    const business = await Business.findOne(uuid, {
        relations: ['followers']
    }).catch((e) => next(new AppError(`Error while finding the business: ${e}`, 500, SERVER_ERROR)));


    if (!business) {
        return next(new AppError('Business not found', 404))
    }


    if (business?.followers.filter(follower => follower.uuid === req.currentUser?.uuid).length < 0) {
        return next(new AppError('You are not a follower', 422, BAD_INPUT))
    }

    const user = await User.findOne(req?.currentUser?.uuid).catch((e) => next(new AppError(`Error while finding the business: ${e}`, 500, SERVER_ERROR)))


    if (!user) {
        return next(new AppError('User not found', 404))
    }

    business.followers = business.followers.filter(follower => follower.uuid != user.uuid);


    await business.save()



    if (!business) {
        return next(new AppError('Error while updating', 505))
    }


    return res.status(201).json({
        status: "success",
        data: {
            ...business,
        },
    })
})
