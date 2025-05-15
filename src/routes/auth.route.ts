import { Router } from "express";
import { authSignupController, authLoginController } from "../controllers/auth.controller";

const routes = Router();

routes.post("/signup", authSignupController);
routes.post("/login", authLoginController);

const authRoutes = routes;
export default authRoutes;
