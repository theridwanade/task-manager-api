import { Request, Response } from "express";
import Task from "../model/task.model";
import { verifyToken } from "../util/jwttoken";
import User from "../model/users.model";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    let token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    if (!token) {
      res.status(401).json({
        message: "Unauthorized",
        code: 401,
        success: false,
      });
      return;
    }
    const decodedToken = await verifyToken(token);
    if (!decodedToken) {
      res.status(401).json({
        message: "Unauthorized",
        code: 401,
        success: false,
      });
      return;
    }
    const userId = decodedToken.userId;
    const task = {
      owner: userId,
      project: req.body.project || "",
      section: req.body.section || "",
      title: title,
      description: req.body.description || "",
      status: req.body.status || "Todo",
      time: req.body.time || null,
      date: req.body.date || null,
      deadline: req.body.deadline || null,
      priority: req.body.priority || "",
      remider: req.body.remider || false,
    };
    const newTask = await Task.create(task);
    if (!newTask) {
      res.status(500).json({
        message: "Task not created",
        code: 500,
        success: false,
      });
      return;
    }
    const user = await User.findByIdAndUpdate(userId, {
      $push: { tasks: newTask._id },
    });
    res.status(201).json({
      message: "Task created successfully",
      code: 201,
      success: true,
      data: newTask,
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      code: 500,
      success: false,
    });
    return;
  }
};
