import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
const UserSchema = new Schema(
  {
    name: { type: "string", required: true },
    email: { type: "string", required: true, unique: true },
    mobileNo: { type: "string", required: true },
    countryCode: { type: "string" },
    password: { type: "string", required: true },
    state: { type: "string" },
    city: { type: "string" },
    address: { type: "string" },
    isActive: { type: "boolean", default: false },
    isBlocked: { type: "boolean", default: false },
    isOnline: { type: "boolean", default: false },
    isRegistered: { type: "boolean", default: false },
    role: { type: "string", enum: ["USER", "ADMIN"], required: true },
    otp: { type: String },
    otp_expire: { type: Date, default: new Date() },
    images: [{ type: String }],
  },
  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.isPasswordMatched = async function (password) {
  return await bcrypt.compare(password, this.password);
};
UserSchema.methods.createPasswordResetToken = async function () {
  const resettoken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  this.passwordTokenExpire = Date.now() + 30 * 60 * 1000;
  return resettoken;
};
export const Users = mongoose.model("Users", UserSchema);
