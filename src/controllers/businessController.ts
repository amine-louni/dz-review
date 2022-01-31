import { Business } from "../entities/Business";
import { catchAsync } from "../helpers/catchAsync";



export const createBusiness = catchAsync(async (req, res, _next) => {
    const { name, about, state, city, googleMapsUrl, phone, website, domains, email } = req.body;
    const newDomainRes = await Business.create({
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

    const newDomain = await newDomainRes.save();

    return res.status(201).json({
        status: "success",
        data: {
            ...newDomain,
            createdBy: req.currentUser?.uuid
        },
    })
})