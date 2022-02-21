import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/userRoutes";
import domainRoutes from "./routes/domainRoutes";
import businessRoutes from "./routes/businessRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import { NOT_FOUND, __dev__ } from "./constatns";
import AppError from "./utils/AppError";
import errorController from "./controllers/errorController";
import path from "path";

const app = express();

// Parse cookies
app.use(cookieParser())


// Get the Auth service for the default app
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));
app.enable("trust proxy");

//GLOBALS MIDDLEWARES

// implement CORS (Access-Control-Allow-Origin *)
app.use(cors());
// Set security http headers
app.use(helmet());

// Development logging
if (__dev__) {
  app.use(morgan("dev"));
}
// Body parser, reading data from the body to req.body
app.use(
  express.json({
    limit: "10kb",
  })
);

// Testing middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  req.requestedTime = new Date().toISOString();

  next();
});

// MOUNTING  ROUTERS
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/domains", domainRoutes);
app.use("/api/v1/business", businessRoutes);
app.use("/api/v1/reviews", reviewRoutes);

//Error Handling (if the route is not  of the previous ones (not found))
app.all("*", (req, _res, next) => {
  // Passing The error to the globalError Handler
  next(
    new AppError(
      `can not find ${req.originalUrl} on this server!`,
      404,
      NOT_FOUND
    )
  );
});

// @Todoo Global error handling
app.use(errorController);

export default app;
