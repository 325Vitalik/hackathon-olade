import { randomRoutes } from "./random.route";
import { forbiddenRoutes } from "./forbidden.route";
import { userRoutes } from "./user.route";
import { authMiddleware } from "../middlewares/auth.middleware";

export const combineRoutes = (app) => {
    app.use("/api", randomRoutes);
    app.use("/forbidden", forbiddenRoutes);
    app.use("/unauth", authMiddleware, forbiddenRoutes);
    app.use("/user", userRoutes);
};
