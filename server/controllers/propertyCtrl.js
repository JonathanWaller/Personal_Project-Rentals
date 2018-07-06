const getAllProperties = (req, res) => {
  req.app
    .get("db")
    .properties.getAllProperties()
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(err => res.status(500).json(err));
};

const addProperty = (req, res) => {
  const {
    property_title,
    property_location,
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
  db.properties
    .addProperty([
      property_title,
      property_location,
      beds,
      baths,
      description,
      amen_1,
      amen_2,
      amen_3,
      price,
      user_id
    ])
    .then(property => {
      db.images.addUploadImg([firebaseImg, property[0].id]).then(image => {
        return res.status(200).send(property);
      });
    });
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
  console.log(req.body);
  console.log(req.params);
  console.log("image_url", req.body.image_url);
  console.log("btm req.params.id", req.params.id);
  // console.log(req.body.firebaseImg);
  // console.log("typeof params", typeof req.params);
  // console.log(req.params.id);
  // console.log(typeof req.params.id);
  // const { id } = req.params;
  let db = req.app.get("db");
  db.properties.updateProperty(
    req.params.id,
    req.body.property_title,
    req.body.property_location,
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
