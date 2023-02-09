const Newsletters = require("../models/Newsletter.model");
const User = require("../models/user.model");
const jwt = require('jsonwebtoken');

exports.createNewsletters = (req, res, next) => {
    const decoded = jwt.verify((req.headers['id']), process.env.SECRETKEY);
    console.log(decoded['subject']);
    const Newsletter = new Newsletters({
        ...req.body,
        user: { "_id": decoded['subject'] }
    });
    // console.log(req.body.user._id)
    const user = User.findOneAndUpdate({ _id: decoded['subject'] }, { $push: { newsletter: Newsletter._id } }).exec();
    console.log(user)

    Newsletter.save().then(() => {
        res.status(200).json({ message: 'objet crée' })
    }).catch(error => res.status(400).json({ error }));
}

