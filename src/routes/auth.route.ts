import { Router } from "express";
import { authSignupController } from "../controllers/auth.controller";

const routes = Router();

routes.post("/signup", authSignupController);

const authRoutes = routes;
export default authRoutes;
