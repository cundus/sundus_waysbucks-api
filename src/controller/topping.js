const { Topping } = require("../../models");
const path = process.env.PATH_PRODUCT;

exports.getToppings = async (req, res) => {
  try {
    const toppings = await Topping.findAll({
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });

    const data = toppings.map((topping) => {
      topping.image = topping.image ? path + topping.image : null;
      return topping;
    });

    res.status(200).send({
      status: "Success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error Cannot Get Toppings",
    });
  }
};

exports.getTopping = async (req, res) => {
  try {
    const data = await Topping.findOne({
      where: {
        id: req.params.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    data.image = data.image ? path + data.image : null;

    res.status(200).send({
      status: "Success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error Cannot Get Toppings",
    });
  }
};

exports.addTopping = async (req, res) => {
  try {
    const newData = {
      ...req.body,
      image: req.files.image[0].filename,
    };
    const dataAdded = await Topping.create(newData, {});
    const data = await Topping.findOne({
      where: {
        id: dataAdded.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    data.image = data.image ? path + data.image : null;

    res.status(200).send({
      status: "Success",
      message: "Success Add New Data",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "server Error cannot add new Data",
    });
  }
};

exports.updateTopping = async (req, res) => {
  try {
    const { id } = req.params;

    const newData = {
      ...req.body,
      image: req.files.image[0].filename,
    };

    await Topping.update(newData, {
      where: { id: id },
    });

    const data = await Topping.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });

    data.image = data.image ? path + data.image : null;

    res.status(200).send({
      status: "Success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({
      status: "Failed",
      message: "Server Error Cannot Update Data",
    });
  }
};

exports.deleteTopping = async (req, res) => {
  try {
    const { id } = req.params;
    await Topping.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).send({
      status: "Success",
      message: `Success Delete Topping with Id ${id}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Server Error, Cannot Delete Data!",
    });
  }
};
