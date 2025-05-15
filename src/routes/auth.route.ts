import { Router } from "express";
import { authSignupController, authLoginController, authLogoutController } from "../controllers/auth.controller";

const routes = Router();

routes.post("/signup", authSignupController);
routes.post("/login", authLoginController);
routes.get("/logout", authLogoutController);

const authRoutes = routes;
export default authRoutes;
