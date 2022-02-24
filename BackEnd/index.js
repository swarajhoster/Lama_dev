const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");

// ENV config
dotenv.config();

//MongoDB Connect
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

//APP Dependencies
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/stripe", stripeRoute);

app.get("/", (req, res) => {
  res.send(
    "SORRY, THIS IS A PRIVATE API SERVICE, DO'NT TRY TO USE THIS API FOR OTHER USE. ELSE THE CASE WILL REGISTER FOR CYBER SECURITY."
  );
});

//Create Server
app.listen(5000, () => {
  console.log(`Server Connected AT : http://localhost:5000`);
});
