import { Document, model, Schema } from "mongoose";

interface ITask extends Document {
  owner: string;
  project: string;
  section: string;
  title: string;
  description: string;
  status: "Todo" | "Inprogress" | "Done";
  time: Date; // change to time string
  date: Date;
  deadline: Date;
  priority: "P1" | "P2" | "P3" | "P4" | "";
  remider: boolean;
}

const taskModelSchema = new Schema<ITask>(
  {
    owner: {
      type: String,
      required: true,
    },
    project: {
      type: String,
      ref: "Project",
    },
    section: {
      type: String,
      ref: "Section",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Todo", "Inprogress", "Done"],
      default: "Todo",
    },
    time: {
      type: Date,
    },
    date: {
      type: Date,
    },
    deadline: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["P1", "P2", "P3", "P4", ""],
      default: "",
    },
    remider: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = model("Task", taskModelSchema);
export default Task;
