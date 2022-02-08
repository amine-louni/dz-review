
import AppError from "../helpers/AppError";
import { Business } from "../entities/Business";
import { catchAsync } from "../helpers/catchAsync";
import { BAD_INPUT, NOT_AUTHORIZED } from "../constatns";
import { Domain } from "../entities/Domain";
import { In } from "typeorm";





export const createBusiness = catchAsync(async (req, res, next) => {
    console.log('create');
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

    newBusinessRes.domains = theDomains;

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

    // check if exiits
    const business = await Business.findOne(uuid);


    if (!business) {
        return next(new AppError('Business not found', 404))
    }
    if (business.createdBy.uuid !== req.currentUser?.uuid && req.currentUser?.role !== 'admin') {
        return next(new AppError('You are not allowed to prefrom this action', 403, NOT_AUTHORIZED))
    }

    const updated = await Business.update(uuid, req.body).catch((e) => {
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
    const business = await Business.findOne(uuid);

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

    console.log(domainId, 'domain id');
    const businesses = await Business.find({

    });
    return res.json({
        status: "success",
        data: [
            ...businesses
        ],
    })
})

