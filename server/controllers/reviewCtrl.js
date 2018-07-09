const addReview = (req, res) => {
  const { review, post_id, user_id, reviewer_id } = req.body;
  let db = req.app.get("db");
  db.reviews.addReview([review, post_id, user_id, reviewer_id]).then(review => {
    console.log(review);
    console.log("req.body", req.body);
    return res.status(200).send(review);
  });
};

const getReviews = (req, res) => {
  let db = req.app.get("db");
  db.reviews.getAllReviews().then(response => {
    console.log(response);
    res.status(200).json(response);
  });
};

module.exports = {
  addReview,
  getReviews
};
