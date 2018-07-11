// const addRating = (req, res) => {
//   const { rating, reviewer_id, post_id } = req.body;
//   let db = req.app.get("db");
//   db.ratings.addRating([rating, reviewer_id, post_id]).then(rating => {
//     console.log("req.body", req.body);
//     return res.status(200).send(rating);
//   });
// };

const getAvgRating = (req, res) => {
  let db = req.app.get("db");
  db.reviews.avgRating().then(response => {
    // console.log(response);
    res.status(200).json(response);
  });
};

module.exports = {
  getAvgRating
  //   addRating
};
