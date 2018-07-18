const addFavorite = (req, res) => {
  console.log(req.body);
  const {
    image_url,
    owner_post_id,
    property_title,
    beds,
    baths,
    description,
    price,
    address,
    city,
    round,
    owner_name,
    owner_avatar,
    user_id
  } = req.body;
  let db = req.app.get("db");
  db.favorites
    .addFavorite([
      image_url,
      owner_post_id,
      property_title,
      beds,
      baths,
      description,
      price,
      address,
      city,
      round,
      owner_name,
      owner_avatar,
      user_id
    ])
    .then(favorite => {
      res.status(200).send(favorite);
    });
};

const getFavorites = (req, res) => {
  let db = req.app.get("db");
  db.favorites
    .getFavorites([req.params.id])
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err));
};

const deleteFavorite = (req, res) => {
  const { id } = req.params;
  let db = req.app.get("db");
  db.favorites.deleteFavorite(id);
  res.sendStatus(200);
};

module.exports = {
  addFavorite,
  getFavorites,
  deleteFavorite
};
