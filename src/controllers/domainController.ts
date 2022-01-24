
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
            name: name
        },
    })

})