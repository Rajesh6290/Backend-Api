import multer from "multer";
import sharp from "sharp";
import path from "path";

const multerStorage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, res, cb) {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * le9);
    cb(null, file.fieldname + "_" + uniqueSuffix + ".jpeg");
  },
});

const multerFilter = (req, res, cb) => {
  if (file.mimetype.startswith("image")) {
    cb(null, true);
  } else {
    cb(
      {
        msg: "Unsupported file format",
      },
      false
    );
  }
};
const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fieldSize: 20000000 },
});
