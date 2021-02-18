import { randomRoutes } from "./random.route";
import { forbiddenRoutes } from "./forbidden.route";
import { userRoutes } from "./user.route";

export const combineRoutes = (app) => {
    app.use("/api", randomRoutes);
    app.use("/forbidden", forbiddenRoutes);
    app.use("/user", userRoutes);
};
