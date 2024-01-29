import slugify from "slugify";
import { Cart } from "../models/cart.models.js";
import { Products } from "../models/product.models.js";
import { Users } from "../models/user.models.js";
import { WishList } from "../models/wishlist.models.js";
import { Ratings } from "../models/rating.models.js";
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
    const products = await Products.find()
      .skip(skip)
      .limit(limit)
      .populate("category", "name") // Populate the 'category' field with the 'name' property
      .populate("brand", "name");
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
    const data = await Products.findById(id)
      .populate("category", "name")
      .populate("brand", "name");
    const ratings = await Ratings.find({ product: id }).populate(
      "user",
      "name email"
    );
    const userInformation = ratings.map((rating) => ({
      userId: rating.user._id,
      userName: rating.user.name,
      userEmail: rating.user.email,
      star: rating.star,
      // ... other properties from the 'rating' object
    }));
    const totalStar = ratings?.map((data) => Number(data?.star));
    const sumOfStar = totalStar?.reduce((prev, sum) => prev + sum, 0);
    const finalStar = sumOfStar / totalStar.length;

    res.json({
      data,
      ratings: {
        star: userInformation,
      },
      totalStar: finalStar,
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productDelete = await Products.findOneAndDelete(id);
    await Cart.findOneAndDelete({ product: id });
    await WishList.findOneAndDelete({ product: id });

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

export {
  UpdateProduct,
  addToWishlist,
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
};
