import { Document, model, Schema } from "mongoose";

interface IUser extends Document {
  teams: string[];
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  isVerified: boolean;
  task: string[];
}

const userModelSchema = new Schema<IUser>(
  {
    teams: {
      type: [String],
      ref: "Team",
      default: [],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    task: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userModelSchema);
export default User;
