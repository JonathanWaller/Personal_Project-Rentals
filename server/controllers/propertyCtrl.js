const getAllProperties = (req, res) => {
  req.app
    .get("db")
    .properties.getAllProperties()
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(err => res.status(500).json(err));
};

//using async / 'await' below in place of multiple .then statements
const addProperty = async (req, res) => {
  const {
    property_title,
    address,
    lat,
    lng,
    city,
    beds,
    baths,
    description,
    amen_1,
    amen_2,
    amen_3,
    price,
    firebaseImg,
    user_id
  } = req.body;
  let db = req.app.get("db");
  const property = await db.properties.addProperty([
    property_title,
    address,
    lat,
    lng,
    city,
    beds,
    baths,
    description,
    amen_1,
    amen_2,
    amen_3,
    price,
    user_id
  ]);
  const image = await db.images.addUploadImg([firebaseImg, property[0].id]);
  const review = await db.reviews.addDefaultReview([property[0].id, user_id]);
  return res.status(200).send(property);
};

const updateImage = (req, res, next) => {
  let db = req.app.get("db");
};

// const addImage = (req, res) => {
//   const { image_url, post_id } = req.body;
//   let db = req.app.get("db");
//   db.properties.addImage([image_url, post_id]).then(image => {
//     console.log(req.body);
//     console.log(image);
//     return res.status(200).send(image);
//   });
// };

const addUploadImage = (req, res, next) => {
  const { url } = req.body;
  let db = req.app.get("db");
  db.images.addUploadImg([url]).then(image => {
    return res.status(200).send(image);
  });
};

const deleteProperty = (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  let db = req.app.get("db");
  db.properties.deleteProperty(id);
  db.images.deleteImage(id).then(() => {
    return res.sendStatus(200);
  });
};

const updateProperty = (req, res) => {
  let db = req.app.get("db");
  db.properties.updateProperty(
    req.params.id,
    req.body.property_title,
    // req.body.property_location,
    // req.body.address,
    // req.body.lat,
    // req.body.lng,
    // req.body.city,
    req.body.beds,
    req.body.baths,
    req.body.description,
    req.body.amen_1,
    req.body.amen_2,
    req.body.amen_3,
    req.body.price
  );
  db.images
    .update_image(req.params.id, req.body.image_url)
    // .update_image([req.body.image_url, req.params.id])
    // .update_image([id, image_url])
    .then(() => {
      return res.sendStatus(200);
    })
    .catch(err => console.log(err));
};

module.exports = {
  getAllProperties,
  addProperty,
  deleteProperty,
  updateProperty,
  updateImage,
  addUploadImage
};
