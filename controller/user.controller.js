import bcrypt from "bcrypt";
import "dotenv/config";
import { generateToken } from "../config/jwt.token.js";
import { Users } from "../models/user.models.js";
import { validateMongoId } from "../utils/validate.mongodbId.js";
import { sendMail } from "./email.controller.js";
import { Address } from "../models/address.models.js";
import { WishList } from "../models/wishlist.models.js";
import { Cart } from "../models/cart.models.js";

const createUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const findUser = await Users.findOne({ email: email });
    if (findUser) {
      res.status(500).json({ msg: "User Already Registered" });
    } else {
      const user = await Users.create(req.body);
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await Users.findOne({ email: email });
    if (!findUser) {
      res.status(500).json({
        msg: "User does not exist",
      });
    } else {
      const isMatched = await findUser.isPasswordMatched(password);
      if (isMatched) {
        const userObject = findUser.toObject();
        let token = await generateToken(findUser?._id);
        const emailData = {
          to: userObject.email,
          text: `Hey ${userObject.name} you have login ! if not you then change password immediately `,
          subject: "Login to our service",
          htm: `Thanks for logging in  `,
        };
        sendMail(emailData);
        res.json({
          data: {
            _id: userObject?._id,
            email: userObject?.email,
            token,
          },
          status: true,
        });
      } else {
        res.json({
          msg: "Invalid Credentials",
        });
      }
    }
  } catch (error) {
    res.json({
      msg: error.message,
      status: true,
    });
  }
};

const getAllUser = async (req, res) => {
  const users = await Users.find();
  if (users.length > 0) {
    res.json(users);
  } else {
    res.json({ msg: "no users found", status: true });
  }
};

const getSelfData = async (req, res) => {
  const { _id } = req.user;
  validateMongoId(_id);
  try {
    const user = await Users.findById(_id);
    const addressData = await Address.find({ user: _id });
    const wishlist = await WishList.find({ user: _id }).populate({
      path: "product",
      model: "Products",
    });

    const cart = await Cart.find({ user: _id }).populate({
      path: "product",
      model: "Products",
    });

    if (!user) {
      res.json({ msg: "no user found", status: true });
    } else {
      res.json({
        data: {
          user,
          addressData,
          wishlist,
          cart,
        },
      });
    }
  } catch (error) {
    res.json({ msg: error.message, status: false });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const getUser = await Users.findById(id);
    res.json(getUser);
  } catch (error) {
    res.json({ msg: "user not found", status: true });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await Users.findByIdAndDelete(id);
    res.json(deleteUser);
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updateUser = await Users.findByIdAndUpdate(
      id,
      {
        name: req?.body?.name,
        mobileNo: req?.body?.mobileNo,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { oldPassword, password } = req.body;
    const user = await Users.findById(_id);
    if (!user) {
      return res.json({ msg: "User not found" });
    } else {
      const isMatched = await user.isPasswordMatched(oldPassword);

      if (isMatched) {
        const hashPassword = await bcrypt.hash(password, 10);
        const updatePass = await Users.findByIdAndUpdate(
          user._id,
          { password: hashPassword },
          { new: true }
        );

        return res.json(updatePass);
      } else {
        return res.json({ msg: "passwords do not match" });
      }
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

export {
  changePassword,
  createUser,
  deleteUser,
  getAllUser,
  getSelfData,
  getUser,
  loginUser,
  updateUser,
};
