const addReview = (req, res) => {
  const { review, post_id, user_id } = req.body;
  let db = req.app.get("db");
  db.reviews.addReview([review, post_id, user_id]).then(review => {
    console.log(review);
    return res.status(200).send(review);
  });
};

module.exports = {
  addReview
};
