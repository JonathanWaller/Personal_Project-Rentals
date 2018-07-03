const getAllProperties = (req, res) => {
  req.app
    .get("db")
    .properties.getAllProperties()
    .then(response => {
      console.log(response);
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
    amenities,
    price
  } = req.body;
  let db = req.app.get("db");
  db.addProperty([
    property_title,
    property_location,
    beds,
    baths,
    description,
    amenities,
    price
  ]).then(property => {
    // console.log(property);
    // console.log(req.body);
    return res.status(200).send(property);
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
  console.log(req.params);
  console.log(req.body);
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
  updateProperty
};
