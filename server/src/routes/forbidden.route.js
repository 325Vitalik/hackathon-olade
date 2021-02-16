import { Router } from "express";
import { randomService } from "../services/random.service";

const router = new Router();

router.get("/", (req, res, next) => {
  const error = new Error(randomService.getError());
  error.statusCode = 403;
  next(error);
});

export { router as forbiddenRoutes };
