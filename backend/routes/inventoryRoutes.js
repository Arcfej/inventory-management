const { addProduct, removeProduct, modifyQuantity } = require("../controllers/inventoryController");
const router = require("express").Router();

router.post("/add", addProduct);
router.put("/remove/", removeProduct);
router.put("/changeStock", modifyQuantity);

module.exports = router;