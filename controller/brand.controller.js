import { Brands } from "../models/brand.models.js";
import { validateMongoId } from "../utils/validate.mongodbId.js";

const createBrand = async (req, res) => {
  try {
    const brand = await Brands.create(req.body);
    res.json(brand);
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};
const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoId(id);
    const brand = await Brands.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(brand);
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};
const getAllBrand = async (req, res) => {
  try {
    const brand = await Brands.find();
    res.json(brand);
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};
const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoId(id);
    const brand = await Brands.findById(id);
    res.json(brand);
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};
const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoId(id);
    const brand = await Brands.findByIdAndDelete(id);
    res.json(brand);
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

export { createBrand, updateBrand, getAllBrand, getBrandById, deleteBrand };
