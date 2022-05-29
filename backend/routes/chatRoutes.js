const express = require("express")
const { accessChat, fetchChats , createGroupChat, renameGroup, removeFromGroup, AddToGroup } = require("../controllers/ChatControllers")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

router.route('/').post(protect,accessChat)
router.route('/').get(protect,fetchChats)
router.route('/group').post(protect,createGroupChat)
router.route('/rename').put(protect,renameGroup)
router.route('/groupremove').put(protect,removeFromGroup)
router.route('/groupadd').put(protect,AddToGroup)

module.exports = router