const storesType = require('../models/storesType')

exports.get = (req, res) => {
  storesType.find()
    .then((data) => { res.status(200).json(data) })
    .catch((err) => { res.sendStatus(400) })
}

exports.add = function (req, res) {
  console.log("req.body", req.body)
  let { specialty } = req.body
  specialty = specialty.toLowerCase().trim()
  const newType = new storesType({ specialty })
  newType.save()
    .then(() => {
      storesType.find()
        .then((data) => res.status(200).json(data))
    })
    .catch((err) => res.status(500).json({ msg: "server error" }))
}