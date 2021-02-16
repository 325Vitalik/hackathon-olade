import { randomRoutes } from "./random.route";
import { forbiddenRoutes } from "./forbidden.route";

export const combineRoutes = (app) => {
  app.use("/api", randomRoutes);
  app.use("/forbidden", forbiddenRoutes);
};
