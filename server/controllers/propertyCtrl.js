const getAllProperties = (req, res) => {
  req.app
    .get("db")
    .properties.getAllProperties()
    .then(response => {
      // console.log(response);
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
    firebaseImg
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
      price
    ])
    // .then(property => {
    //   db.properties.addImage([image_url, property[0].id]).then(image => {
    //     return res.status(200).send(property);
    //   });
    // })
    .then(property => {
      console.log(req.body);
      db.properties.addUploadImg([firebaseImg, property[0].id]).then(image => {
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
  db.addUploadImg([url]).then(image => {
    return res.status(200).send(image);
  });
};

const deleteProperty = (req, res) => {
  const { id } = req.params;
  let db = req.app.get("db");
  db.deleteProperty(id).then(() => {
    // console.log(req.params);
    return res.sendStatus(200);
  });
};

const updateProperty = (req, res) => {
  // console.log(req.params);
  // console.log(req.body);
  const { id } = req.params;
  const {
    property_title,
    property_location,
    beds,
    baths,
    description,
    amenities,
    price
  } = req.body;
  let db = req.app.get("db");
  db.updateProperty([
    id,
    property_title,
    property_location,
    beds,
    baths,
    description,
    amenities,
    price
  ])
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
