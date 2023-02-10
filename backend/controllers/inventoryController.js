const Product = require("../models/productModel.js");

module.exports.fetchInventory = async (req, res) => {
    try {
        res.status(200).send({ inventory: await Product.find() });
    } catch (e) {
        res.status(400).send(e);
    }
}

module.exports.addProduct = async (req, res) => {
    const { name, quantity } = req.body;
    if (await Product.find({ name: name })) {
        res.status(400).send("Product already exists");
    }
    try {
        const product = new Product({
            name,
            quantity,
        });
        await product.save();
        res.status(201)
            .send({ message: "Product successfully added", inventory: await Product.find() });
    } catch (e) {
        res.status(400).send(e);
    }
};

module.exports.removeProduct = async (req, res) => {
    const { name } = req.body;
    if (await Product.find({ name: name }).deleteOne()) {
        res.status(200)
            .send({message: "Product successfully removed", inventory: await Product.find() });
    } else {
        res.status(400).send("Product not found");
    }
};

module.exports.modifyQuantity = async (req, res) => {
    const { name, quantity } = req.body;
    const product = await Product.findOneAndUpdate({ name: name }, { quantity: quantity }, { new: true });
    if (product) {
        res.status(200)
            .send({ message: "Product quantity modified", inventory: await Product.find() });
    }
}
