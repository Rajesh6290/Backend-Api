import { OTP } from "../models/otp.models.js";
import { Users } from "../models/user.models.js";
import { sendMail } from "../controller/email.controller.js";
import bcrypt from "bcrypt";
const createOtp = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await Users.findOne({ email: email });
    if (!user) {
      res.json({ msg: "User not found" });
    } else {
      let Otp = Math.floor(Math.random() * 999999);
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 2);
      const result = await OTP.findOneAndUpdate(
        {
          email: email,
        },
        { otp: Otp, otpExpires: expiresAt, user: user._id },
        { upsert: true, new: true }
      );

      const emailData = {
        to: email,
        text: `Hey ${user.name} `,
        subject: "Forgot Password OTP",
        htm: `The forgot password otp is ${Otp} .This otp valid only 2 minutes.`,
      };
      const emailResult = await sendMail(emailData);
      res.json({ result, emailResult });
    }
  } catch (error) {
    res.json(error);
  }
};
const verifyAndUpdatePassword = async (req, res) => {
  const { otp, newPassword } = req.body;
  try {
    const verifyOtp = await OTP.findOne({
      otp: otp,
      otpExpires: { $gte: new Date() },
    });

    if (!verifyOtp) {
      res.json({ msg: "OTP expired" });
    } else {
      const user = await Users.findOne({ _id: verifyOtp.user });
      if (!user) {
        res.json({ msg: "user not found" });
      } else {
        const hashPassword = await bcrypt.hash(newPassword, 10);
        const result = await Users.findByIdAndUpdate(
          user._id,
          { password: hashPassword },
          { new: true }
        );
        res.json(result);
      }
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

export { createOtp, verifyAndUpdatePassword };
