const express = require("express");

const router = express.Router();
const Usercontroller = require("../controllers/User");

router.get('/alleq', Usercontroller.getEq);

router.get("/getoneuser/:email",Usercontroller.getOneuser);

router.post('/sendEmail/:email',Usercontroller.sendMail);

router.put('/update',Usercontroller.updateUser);

module.exports = router;