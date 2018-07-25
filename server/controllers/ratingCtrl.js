const getAvgRating = (req, res) => {
  let db = req.app.get("db");
  db.reviews.avgRating().then(response => {
    // console.log(response);
    res.status(200).json(response);
  });
};

module.exports = {
  getAvgRating
};
