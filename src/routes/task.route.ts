import { Router } from "express";
import { createTask } from "../controllers/task.controller";
const routes = Router();

routes.post("/create", createTask)


const taskRoutes = routes;
export default taskRoutes;
