const {
  Transaction,
  TransactionProduct,
  TransactionTopping,
  User,
  Product,
  Topping,
} = require("../../models");

const path = process.env.PATH_TRANSACTION;
const path_product = process.env.PATH_PRODUCT;

exports.addTransactionOld = async (req, res) => {
  try {
    const { body, idUser } = req;
    const {
      name,
      email,
      phone,
      address,
      zipCode,
      attachment,
      total,
      products,
    } = body;

    const transactions = await Transaction.create({
      name,
      email,
      phone,
      address,
      zipCode,
      total,
      attachment: null,
      status: "Waiting Approve",
      userId: idUser,
    });

    const dataProduct = JSON.parse(products);
    await Promise.all(
      dataProduct.map(async (product) => {
        const { id, quantity, toppings } = product;

        const transactionProducts = await TransactionProduct.create({
          transactionId: transactions.id,
          productId: id,
          quantity: quantity,
        });

        toppings.map(async (topping) => {
          await TransactionTopping.create({
            transactionProductId: transactionProducts.id,
            toppingId: topping,
          });
        });
      })
    );

    const newTransactionAdded = await Transaction.findOne({
      where: {
        id: transactions.id,
      },
      attributes: ["status"],
      include: [
        {
          model: User,
          as: "userOrder",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "role_id"],
          },
        },
        {
          model: Product,
          as: "order",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          through: {
            attributes: [["orderQuantity", "qty"]],
            as: "orderQuantity",
          },
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const { body, idUser } = req;
    console.log("ini NEw Transaction Body", req.body);
    const newTransactionData = {
      ...body,
      userId: idUser,
      order: JSON.parse(body.order),
      status: "Waiting Approve",
      attachment: req.files.attachment[0].filename,
    };
    await Transaction.create(newTransactionData, {
      include: [
        {
          association: "order",
          include: [
            {
              association: "toppings",
            },
          ],
        },
      ],
    });

    res.status(200).send({
      status: "Success",
      message: "Success Add New Transaction",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Server Error Cannot Add new Transaction",
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "userOrder",
          attributes: ["id", "name", "email"],
        },
        {
          model: TransactionProduct,
          as: "order",
          attributes: ["id", "quantity", "subtotal"],
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["title", "price", "image"],
            },
            {
              model: TransactionTopping,
              as: "toppings",
              attributes: ["toppingId"],
              include: [
                {
                  model: Topping,
                  as: "toppings",
                  attributes: ["title", "price", "image"],
                },
              ],
            },
          ],
        },
      ],
    });

    res.send({
      status: "success",
      message: "Success Get All Datas",
      data: transactions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Cannot Get all Datas",
    });
  }
};

exports.getTransactionsByUserId = async (req, res) => {
  try {
    const { idUser } = req;
    const transactions = await Transaction.findAll({
      where: {
        userId: idUser,
      },
      attributes: ["id", "status", "total"],
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "userOrder",
          attributes: ["id", "name", "email"],
        },
        {
          model: TransactionProduct,
          as: "order",
          attributes: ["id", "quantity", "subtotal"],
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["title", "price", "image"],
            },
            {
              model: TransactionTopping,
              as: "toppings",
              attributes: ["toppingId"],
              include: [
                {
                  model: Topping,
                  as: "toppings",
                  attributes: ["title", "price", "image"],
                },
              ],
            },
          ],
        },
      ],
    });

    // const productImage = JSON.parse(JSON.stringify(transactions));
    // console.log(productImage);

    res.send({
      status: "success",
      message: "Success Get All Datas",
      data: transactions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Cannot Get all Datas",
    });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    console.log(body, id);
    await Transaction.update(body, {
      where: {
        id,
      },
    });

    const newTransaction = await Transaction.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserId"],
      },
    });

    res.status(200).send({
      status: "success",
      message: "Success Update Transaction",
      data: newTransaction,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "failed",
      message: "Server Error Cannot Update Transaction ",
    });
  }
};
