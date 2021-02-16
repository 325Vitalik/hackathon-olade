import { Router } from "express";
import { randomService } from "../services/random.service";

const router = new Router();

router.get("/", (req, res, next) => {
  res.json(randomService.getSuccess());
});

export { router as randomRoutes };
