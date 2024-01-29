import { WishList } from "../models/wishlist.models.js";
import { Users } from "../models/user.models.js";
import { Products } from "../models/product.models.js";

const createWishlist = async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;

  try {
    const user = await Users.findById(_id);
    const product = await Products.findById(prodId);

    if (!user || !product) {
      return res.json({ msg: "Product or User not found" });
    }

    const addwishlist = await WishList.create({
      user: _id,

      product: prodId,
    });

    return res.json(addwishlist);
  } catch (error) {
    return res.json({ msg: error.message });
  }
};
const getWishlist = async (req, res) => {
  const { _id } = req.user;
  try {
    const wishlist = await WishList.find({ user: _id }).populate({
      path: "product",
      model: "Products",
    });
    if (!wishlist) {
      res.json({ msg: "Wishlist not found" });
    } else {
      res.json(wishlist);
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};
const deleteWishlist = async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.params;

  try {
    const result = await WishList.findOneAndUpdate(
      { user: _id },
      {
        $pull: { products: prodId },
      }
    );

    res.json(result);
  } catch (error) {
    res.json({ msg: error.message });
  }
};

export { createWishlist, getWishlist, deleteWishlist };
