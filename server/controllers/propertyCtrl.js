const getAllProperties = (req, res) => {
  {
    console.log("req.query", req.query);
    req.query.address
      ? req.app
          .get("db")
          .properties.propertySearch([`%${req.query.address}%`])
          .then(response => {
            console.log("response", response);
            return res.status(200).json(response);
          })
      : req.app
          .get("db")
          .properties.getAllProperties()
          .then(response => {
            return res.status(200).json(response);
          })
          .catch(err => res.status(500).json(err));
  }
};

const getProperty = (req, res) => {
  let db = req.app.get("db");
  db.properties
    .getProperty([req.params.id])
    .then(response => res.status(200).json(response));
};

//using async / 'await' below in place of multiple .then statements
const addProperty = async (req, res) => {
  // console.log(req.body);
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
  addUploadImage,
  getProperty
};
