
import { Domain } from '../entities/Domain'
import { catchAsync } from "../helpers/catchAsync";


export const createDomain = catchAsync(async (req, res, _next) => {
    const { name } = req.body;
    const newDomain = await Domain.create({
        name,
    });


    await newDomain.save();

    return res.status(201).json({
        status: "success",
        data: {
            ...newDomain,
        },
    })
})


export const updateDomain = catchAsync(async (req, res, _next) => {
    const { name, uuid } = req.body;
    const updatedDomain = await Domain.update(uuid, { name })



    return res.status(201).json({
        status: "success",
        data: {
            ...updatedDomain
        },
    })
})


export const getAllDomains = catchAsync(async (_req, res, _next) => {
    const allDomains = await Domain.find();
    return res.status(200).json({
        status: "success",
        data: [
            ...allDomains
        ],
    })
})