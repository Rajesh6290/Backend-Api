import { Products } from "../models/product.models.js";
import { query } from "express";
import slugify from "slugify";
import { Users } from "../models/user.models.js";
const createProduct = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const addProduct = await Products.create(req.body);
    res.json(addProduct);
  } catch (error) {
    res.json({ msg: error.message });
  }
};
const UpdateProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await Products.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    res.json(updateProduct);
  } catch (error) {
    res.json({ msg: error.message });
  }
};
const getAllProduct = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber);
    const limit = parseInt(req.query.limit);
    const skip = (pageNumber - 1) * limit;
    const products = await Products.find().skip(skip).limit(limit);
    if (!products) {
      res.json({ msg: "No users found" });
    } else {
      const totalCount = await Products.countDocuments();
      res.json({
        data: { products },
        totalCount,
        pageNumber,
        limit,
      });
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const allProducts = await Products.findById(id);
    res.json(allProducts);
  } catch (error) {
    res.json({ msg: error.message });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productDelete = await Products.findOneAndDelete(id);
    res.json(productDelete);
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { _id } = req.user;
    const { prodId } = req.body;
    const user = await Users.findById(_id);
    const wishlistAlreadyExists = user.wishlist.find(
      (id) => id.toString() === prodId
    );
    if (wishlistAlreadyExists) {
      let user = await Users.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        { new: true }
      );
      res.json({ user });
    } else {
      let user = await Users.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        { new: true }
      );
      res.json({ user });
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};
const giveRating = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await Users.findById(_id);
    console.log({ user });
    const { star, prodId } = req.body;
    const product = await Products.findById(prodId);
    let productAlreadyRated = product.ratings.find(
      (usersIds) => usersIds?.postedBy?.toString() === _id.toString()
    );
    if (productAlreadyRated) {
      const updateRating = await Products.updateOne(
        {
          ratings: { $eleMatch: productAlreadyRated },
        },
        {
          $set: { "ratings.$.star": star },
        },
        { new: true }
      );
      res.json({ updateRating });
    } else {
      const rateProduct = await Products.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              postedBy: _id,
            },
          },
        },
        { new: true }
      );
    }
    const getTotalRatings = await Products.findById(prodId);
    const totalRatings = getTotalRatings.ratings.length;
    const ratingSum = getTotalRatings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRatings = Math.round(ratingSum / totalRatings);
    let finalProduct = await Products.findByIdAndUpdate(
      prodId,
      {
        totalRatings: actualRatings,
      },
      { new: true }
    );
    res.json({ finalProduct });
  } catch (error) {
    res.json({ msg: error.message });
  }
};
export {
  createProduct,
  UpdateProduct,
  getAllProduct,
  getProduct,
  deleteProduct,
  addToWishlist,
  giveRating,
};
