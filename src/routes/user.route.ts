import { Router } from "express";
import User from "../model/users.model";
const routes = Router();

routes.get("/:id", async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return 
  }
  res.status(200).json(user);
  return 
})

const userRoutes = routes;
export default userRoutes;
