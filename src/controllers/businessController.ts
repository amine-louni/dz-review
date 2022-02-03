import { UpdateResult } from "typeorm";
import { Business } from "../entities/Business";
import { catchAsync } from "../helpers/catchAsync";



export const createBusiness = catchAsync(async (req, res, _next) => {
    const { name, about, state, city, googleMapsUrl, phone, website, domains, email } = req.body;
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

    const newBusiness = await newBusinessRes.save();

    return res.status(201).json({
        status: "success",
        data: {
            ...newBusiness,
        },
    })
})

export const updateBusiness = catchAsync(async (req, res, _next) => {
    const { uuid } = req.params

    // check if exiits

    const updatedBusiness: UpdateResult | void = await Business.update(uuid, req.body).catch((e) => {
        console.error('Error while updating', e);
    });


    return res.status(201).json({
        status: "success",
        data: {
            ...updatedBusiness,
        },
    })
})