const { addProduct, removeProduct, modifyQuantity, fetchInventory } = require("../controllers/inventoryController");
const router = require("express").Router();

router.get("/", fetchInventory);
router.post("/add", addProduct);
router.put("/remove/", removeProduct);
router.put("/changeStock", modifyQuantity);

module.exports = router;