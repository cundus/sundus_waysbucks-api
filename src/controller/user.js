const { User, Role } = require("../../models");
const path = process.env.PATH_PROFILE;

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password", "role_id"],
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
        exclude: ["createdAt", "updatedAt", "password", "role_id"],
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
    const { body, idUser } = req;
    body.picture = req.files.picture[0].filename;
    console.log(body);
    const userData = await User.update(body, { where: { id: idUser } });
    const user = await User.findOne({
      where: { id: idUser },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password", "role_id"],
      },
      include: {
        model: Role,
        as: "Role",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });
    user.picture = user.picture ? path + user.picture : null;
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

exports.getLoggedinUser = async (req, res) => {
  try {
    const id = req.idUser;
    const dataUser = await User.findOne({
      where: {
        id: id,
      },

      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });
    if (!dataUser) {
      return res.status(404).send({
        status: "Data User Not Found",
      });
    }

    res.status(200).send({
      status: "success",
      data: dataUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error Auth Failed",
    });
  }
};
