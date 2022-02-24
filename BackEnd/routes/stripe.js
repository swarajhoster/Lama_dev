const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
// const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(
  "sk_test_51KVX74SCxHU47Uyj0rHeYYNdPJyTYQbWzWLYQo4W4cf5WzHCskcGW63UL99motd9mtGzBXYFqaah1KMxJX2IC4H600cYOF4GDg"
);

router.post("/", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(`stripeErr : ${stripeErr}`);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
