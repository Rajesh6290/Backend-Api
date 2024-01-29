import { Ratings } from "../models/rating.models.js";
import { Users } from "../models/user.models.js";
import { Products } from "../models/product.models.js";

const ratingSystem = async (req, res) => {
  const { _id } = req.user;
  const { prodId, star } = req.body;
  try {
    const user = await Users.findById(_id);
    const product = await Products.findById(prodId);
    if (!user || !product) {
      res.json({ msg: "user or product not found" });
    } else {
      const result = await Ratings.findOneAndUpdate(
        {
          user: _id,
          product: prodId,
        },
        {
          star: star,
          user: _id,
          product: prodId,
        },
        { upsert: true, new: true }
      );
      if (!result) {
        res.json({ msg: "Error creating rating" });
      } else {
        res.json(result);
      }
    }

    const findRatings = await Ratings.find({ product: prodId });
    const allRatings = findRatings.map((data) => Number(data.star));
    const sumRatings = allRatings.reduce((prev, curr) => prev + curr, 0);
    const finalRatings = Math.floor(sumRatings / allRatings.length);

    const allStar = findRatings?.map((data) => Number(data?.star));
    const sumStar = allStar?.reduce((prev, curr) => prev + curr, 0);
    const finalStar = Math.floor(sumStar / allStar.length);
    await Products.findByIdAndUpdate(
      prodId,
      { totalRatings: finalRatings, star: finalStar },
      { new: true }
    );
  } catch (error) {
    res.json({ error });
  }
};

export { ratingSystem };
