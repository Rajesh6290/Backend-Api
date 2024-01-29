import mongoose from "mongoose";
const validateMongoId = async (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    res.json({
      msg: "This id is not valid or not found",
    });
  }
};
export { validateMongoId };
