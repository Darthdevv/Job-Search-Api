import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    recoveryEmail: { type: String },
    DOB: {
      type: Date,
      required: true
    },
    mobileNumber: {
      type: String,
      unique: true,
      required: true
    },
    role: {
      type: String,
      enum: ["User", "Company_HR"],
      required: true
    },
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline"
    },
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema);

export default User;