import { Request, Response } from "express";
import Task from "../model/task.model";
import { verifyToken } from "../util/jwttoken";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, project, section, deadline, priority } = req.body;
    const decodedToken = await verifyToken(req.headers.authorization as string);
    const owner = decodedToken.userId;

    // Validate required fields
    if (!title) {
      res.status(400).json({
        message: "Title is required",
        code: 400,
        success: false,
      });
      return 
    }

    // Create task object
    const task = {
      owner,
      project,
      section,
      title,
      description,
      deadline,
      priority,
    };

    // Save task to database (assuming you have a Task model)
    const newTask = await Task.create(task);

    res.status(201).json({
      message: "Task created successfully",
      code: 201,
      success: true,
      data: newTask,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      code: 500,
      success: false,
    });
    return;
  }
};
