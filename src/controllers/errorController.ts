/* eslint-disable no-console */
import AppError from "../utils/AppError";
import { NextFunction, Request, Response } from "express";
import { DUPLICATED, EXPIRED_TOKEN, INVALID_TOKEN, QUERY_FAILED, __prod__ } from "../constatns";




const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401, INVALID_TOKEN);

const handleJWTExpiredError = () =>
  new AppError(
    "Your token has expired! Please log in again.",
    401,
    EXPIRED_TOKEN
  );

const handleDbValidation = (err: any) => {
  if (!__prod__) {
    console.error(
      err
    )
  }

  let codeError;
  switch (err.code) {
    case '23505':
      codeError = DUPLICATED;
      break;

    default:
      codeError = QUERY_FAILED;
      break;
  }
  const field: string[] = err?.detail.split(/\(|\)/);
  const key = field[1]

  return new AppError(err?.detail, 400, QUERY_FAILED, [{ code: codeError, field: key, description: err?.detai }]);
};



const sendError = (err: any, req: Request, res: Response) => {
  // A) API
  if (req.originalUrl.startsWith("/api")) {
    // A) Operational, trusted error: send message to client
    if (err?.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        code: err.code,
        message: err.message,
        ...err
      });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error("ERROR 💥", err);
    // 2) Send generic message
    return res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }

  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error("ERROR 💥", err);
  // 2) Send generic message
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    msg: "Please try again later.",
  });
};

export default (err: any, req: Request, res: Response, _next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";


  let error = { ...err };
  error.message = err.message;

  if (error?.query) error = handleDbValidation(err);
  if (error?.name === "JsonWebTokenError") error = handleJWTError();
  if (error?.name === "TokenExpiredError") error = handleJWTExpiredError();


  sendError(error, req, res);
}

