import express from "express";
import "dotenv/config";
import dbConfig from "./config/db.config.js";
import bodyParser from "body-parser";
import userRoute from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import categoryRouter from "./routes/category.routes.js";
import brandRouter from "./routes/brand.routes.js";
import addressRouter from "./routes/address.routes.js";
import wishlistRouter from "./routes/wishlist.routes.js";
import cartRouter from "./routes/cart.routes.js";
import ratingRouter from "./routes/rating.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
const app = express();
dbConfig();
const PORT = process.env.PORT || 7000;
app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/rating", ratingRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
