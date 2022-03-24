import AppError from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";
import { BAD_INPUT } from "../constatns";

export const uploadFile = catchAsync(async (req, res, next) => {

    if (!req.file) return next(new AppError('No file was provided', 422, BAD_INPUT))

    return res.json({
        status: "success",
        imgUrl: req.file.path
    })

})