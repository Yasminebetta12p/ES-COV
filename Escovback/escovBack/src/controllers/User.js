
const User = require("../models/user.model");

const Publications = require("../models/Publications.model");

var nodemailer = require("nodemailer")
const jwt = require('jsonwebtoken');


exports.getEq = async (req, res) => {
    console.log("zzazazaa");
    console.log(req.headers['id']);
    const decoded = jwt.verify((req.headers['id']), process.env.SECRETKEY);
    console.log(decoded['email']);
    const user = await User.find({ email: decoded['email'] }).populate("publication", "description from to prix date heure disable contact");
    try {

        if (user) {

            var UserJson = [];
            user.map((c) => {
                UserJson.push({
                    publication: c.publication
                })
            });
            res.status(200).json(UserJson);
        }
    } catch (e) {


        res.status(400).json({ error: "Server error !" });
    }

}

exports.getOneuser = (req, res, next) => {

    User.findOne({ email: req.param('email') }, (error, user) => {
        if (error) {
            console.log(error)
            res.status(401).send(error)
        }
        else {
            res.status(200).json({ user: user });
        }
    })
}
exports.updateUser = (req, res, next) => {
    const errors = [];
    console.log("hana lenna");

    if (!req.body.username) {
        errors.push("Username is required");
    }
    if (!req.body.contact) {
        errors.push("contact is required");
    }
    if (errors.length) {
        return res.status(400).json({
            errors
        });
    }
    console.log("hana lenna");
    const decoded = jwt.verify((req.headers['id']), process.env.SECRETKEY);

    User.updateOne({ _id: decoded["subject"] }, {
        ...req.body,
    }, function (err, user) {
        if (err) {
            console.log("something went wrong!!")
            res.json({ errormsg: "something went wrong!!" });
        }
        else {
            console.log("edited profile");
            res.status(200).json({ message: 'objet crée' })
        }
    })
}




exports.sendMail = async (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'eya.bahri@esprit.tn',
            pass: "191JFT4899"
        }
    });

    var mailOptions = {
        from: 'eya.bahri@esprit.tn',
        to: req.param('email'),
        // cc:cc,
        subject: 'ESCOV!!',
        text: "BON",

    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
