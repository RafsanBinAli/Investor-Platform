var express = require("express");
const { setMeeting, getParticularMeeting } = require("../controllers/schedule");
var router = express.Router();

router.post("/set/:username", setMeeting);
router.get("/search/:code", getParticularMeeting);


module.exports = router;
