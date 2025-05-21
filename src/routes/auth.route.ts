import { Router } from "express";
import { authSignupController, authLoginController, authLogoutController, authRefreshTokenController } from "../controllers/auth.controller";

const routes = Router();

routes.post("/signup", authSignupController);
routes.post("/login", authLoginController);
routes.get("/logout", authLogoutController);
routes.get("/refresh-token", authRefreshTokenController);

const authRoutes = routes;
export default authRoutes;
