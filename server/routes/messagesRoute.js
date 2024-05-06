const {
  addMessage,
  getAllMessages,
} = require("../controllers/messageController");
const router = require("express").Router();
router.post("/addMessage", addMessage);
router.post("/getAllMessage", getAllMessages);
module.exports = router;
