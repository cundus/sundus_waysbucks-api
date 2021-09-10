const { Product } = require("../../models");
const path = process.env.PATH_PRODUCT;

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });

    const data = products.map((product) => {
      product.image = product.image ? path + product.image : null;
      return product;
    });

    res.status(200).send({
      status: "success",
      message: "Get All Product",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error Cannot Get Products",
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const products = await Product.findOne({
      where: {
        id: req.params.id,
      },
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });

    products.image = products?.image ? path + products.image : null;

    res.status(200).send({
      status: "success",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error cannot get product",
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const products = await Product.create({
      ...req.body,
      image: req.files.image[0].filename,
    });

    products.image = products.image ? path + products.image : null;

    res.status(200).send({
      status: "success",
      message: "Add Product Success",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "server Error cannot add new Data",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const newData = {
      ...req.body,
      image: req.files.image[0].filename,
    };

    const updatedData = await Product.update(newData, {
      where: { id: id },
    });

    const products = await Product.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });

    products.image = products.image ? path + products.image : null;

    res.status(200).send({
      status: "Success",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({
      status: "Failed",
      message: "Server Error Cannot Update Data",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).send({
      status: "Success",
      message: `Success Delete Product with Id ${id}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Server Error, Cannot Delete Data!",
    });
  }
};
