const { User, Role } = require("../../models");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
      include: {
        model: Role,
        as: "Role",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    res.status(200).send({
      status: "Success",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error Cannot get users data!",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
      include: {
        model: Role,
        as: "Role",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    res.status(200).send({
      status: "Success",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      messsage: "Server error cannot get user data",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { body } = req;
    const userData = await User.update(body, { where: { id: req.params.id } });
    const user = await User.findOne({
      where: { id: userData.id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
      include: {
        model: Role,
        as: "Role",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    res.status(200).send({
      status: "Success",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      messsage: "Server error cannot update user data",
    });
  }
};
