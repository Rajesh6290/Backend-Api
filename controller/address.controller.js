import { Address } from "../models/address.models.js";

import { Users } from "../models/user.models.js";

const createAddress = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await Users.findById(_id);
    if (!user) {
      res.json({ msg: "User not found" });
    } else {
      const address = await Address.create({ ...req.body, user: _id });

      res.json(address);
    }
  } catch (error) {}
};
const getAllAddress = async (req, res) => {
  const { _id } = req.user;
  try {
    const address = await Address.find({ user: _id });
    if (!address) {
      res.json({ msg: "User not found" });
    } else {
      res.json(address);
    }
  } catch (error) {}
};
const updateAddress = async (req, res) => {
  const { id } = req.params;
  try {
    const updateAddress = await Address.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateAddress);
  } catch (error) {
    res.json({ msg: error.message });
  }
};
const deleteAddress = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteAddress = await Address.findByIdAndDelete(id);
    res.json(deleteAddress);
  } catch (error) {
    res.json({ msg: error.message });
  }
};
const getAddressById = async (req, res) => {
  const { id } = req.params;
  try {
    const address = await Address.findById(id);
    if (!address) {
      res.json({ msg: "Address not found" });
    } else {
      res.json(address);
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};
export {
  createAddress,
  getAllAddress,
  updateAddress,
  deleteAddress,
  getAddressById,
};
