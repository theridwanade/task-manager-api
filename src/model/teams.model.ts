import { Document, model, Schema } from "mongoose";
import { SubAdminType, TaskType } from "../util/type";

interface ITeam extends Document {
  projects: string[];
  name: string;
  admin: string;
  subAdmin: SubAdminType[];
  members: string[];
  tasks: TaskType[];
}

const teamModelSchema = new Schema<ITeam>(
  {
    projects: {
      type: [String],
      ref: "Projects",
      default: []
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    admin: {
      type: String,
      required: true,
      ref: "User"
    },
    subAdmin: {
      type: [Object], // You may want to define a Schema for SubAdminType
      required: false
    },
    members: {
      type: [String],
      ref: "User",
      default: []
    },
    tasks: {
      type: [String], // You may want to define a Schema for TaskType
      ref: "Task",
      default: []
    }
  },
  {
    timestamps: true,
  }
);

const Team = model<ITeam>("Team", teamModelSchema);
export default Team;
