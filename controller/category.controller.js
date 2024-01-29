import { Category } from "../models/category.models.js";
import { validateMongoId } from "../utils/validate.mongodbId.js";

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoId(id);
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(category);
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};
const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.json(category);
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoId(id);
    const category = await Category.findById(id);
    res.json(category);
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoId(id);
    const category = await Category.findByIdAndDelete(id);
    res.json(category);
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

export {
  createCategory,
  updateCategory,
  getAllCategory,
  getCategoryById,
  deleteCategory,
};
