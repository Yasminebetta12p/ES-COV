const express = require("express");

const router = express.Router();
const Publicationscontroller = require("../controllers/Publication");

// TODO add auth middleware to all the routes
router.post("/", Publicationscontroller.createPublications);

router.put("/:id", Publicationscontroller.modifyPublications);

router.get("/getAll", Publicationscontroller.getAll);

router.get("/latest", Publicationscontroller.latestt);

router.post("/search", Publicationscontroller.search);

router.get("/:id", Publicationscontroller.getOnePublications);


router.delete("/:id", Publicationscontroller.deleteOnePublications);


module.exports = router;