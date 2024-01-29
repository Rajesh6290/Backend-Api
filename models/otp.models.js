import { Schema, model } from "mongoose";
const OtpSchema = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  otpExpires: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: "Users" },
});

export const OTP = model("OTP", OtpSchema);
