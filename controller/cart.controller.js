import { Cart } from "../models/cart.models.js";
import { Users } from "../models/user.models.js";

const addToCart = async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
    const user = await Users.findById(_id);
    const products = await Cart.findOne({ product: prodId });
    if (!user) {
      res.json({ msg: "User not  found" });
    } else {
      if (!products) {
        let quantity = 0;
        const result = await Cart.create({
          user: _id,
          product: prodId,
          quantity: quantity + 1,
        });
        res.json(result);
      } else {
        res.json({ msg: "Product already  added" });
      }
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};
const removeCart = async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.params;
  try {
    const result = await Cart.findOneAndDelete({ user: _id, product: prodId });
    res.json(result);
  } catch (error) {
    res.json({ msg: error.message });
  }
};
const getAllProductInCart = async (req, res) => {
  const { _id } = req.user;
  try {
    const cartItems = await Cart.find({ user: _id }).populate({
      path: "product",
      model: "Products",
      populate: [
        { path: "category", model: "Category", select: "name" },
        { path: "brand", model: "Brands", select: "name" },
      ],
    });
    const products = cartItems.map((product) => {
      const productData = product.product;
      const productQuantity = product.quantity;
      const amount = productQuantity * productData.price;
      const finalProduct = productData.toObject();

      return {
        finalProduct,
        amount,
      };
    });
    const amount = products.reduce((sum, product) => sum + product.amount, 0);
    console.log(amount);
    res.json({
      status: true,
      data: {
        products: products,
        totalAmount: amount,
      },
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
};
const increaseQuantity = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  try {
    const findData = await Cart.findOne({ user: _id, product: id });
    if (!findData) {
      res.json({ msg: "Cart not found" });
    } else {
      let quantity = findData.quantity;
      const updateQuantity = await Cart.findOneAndUpdate(
        { user: _id, product: id },
        { quantity: quantity + 1 },
        { upsert: true, new: true }
      );
      res.json(updateQuantity);
    }
  } catch (error) {
    res.json(error);
  }
};
const decreaseQuantity = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  try {
    const findData = await Cart.findOne({ user: _id, product: id });
    if (!findData) {
      res.json({ msg: "Cart not found" });
    } else {
      let quantity = findData.quantity;
      if (quantity > 0) {
        const updateQuantity = await Cart.findOneAndUpdate(
          { user: _id, product: id },
          { quantity: quantity - 1 },
          { upsert: true, new: true }
        );
        res.json(updateQuantity);
      } else {
        res.json({ msg: "Quantity Already Zero", status: "false" });
      }
    }
  } catch (error) {
    res.json(error);
  }
};
export {
  addToCart,
  decreaseQuantity,
  getAllProductInCart,
  increaseQuantity,
  removeCart,
};
