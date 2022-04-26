import { catchAsync } from "../utils/catchAsync";
import { User } from "../entities/User";
import AppError from "../utils/AppError";
import { ALLOWED_USER_FIELDS_TO_UPDATE, NOT_FOUND } from "../constatns";
import { allowFieldsType } from "../@types/user";

export const getUser = catchAsync(async (req, res, next) => {
  const { username } = req.params;

  // 1 ) find the user  &  check if exists
  const theUser = await User.findOne({ userName: username });
  console.log(theUser, ' the user')

  if (!theUser) {
    return next(new AppError("user not found", 404, NOT_FOUND));
  }

  // 3) Ok !
  return res.json({
    status: "success",
    user: theUser,
  });
});

export const updateMe = catchAsync(async (req, res, next) => {
  const { body } = req;

  // 1) Create error if user POSTs password data
  if (req.body.password) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  Object.keys(body).forEach((bodyKey): void => {
    if (!ALLOWED_USER_FIELDS_TO_UPDATE.includes(bodyKey as allowFieldsType)) {
      delete body[bodyKey];
    }
  });

  //  2 ) Update the user

  await User.update(
    { uuid: req.currentUser?.uuid },
    {
      ...body,
    },
    {}
  )

  const updatedUser = await User.findOne({ uuid: req.currentUser?.uuid });

  // 3) Ok !
  return res.json({
    status: "success",
    user: updatedUser,
  });
});
