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

module.exports = {
  getAllProperties
};
