const { Role } = require("../../models");

exports.addRole = async (req, res) => {
  try {
    const { body } = req;
    console.log(body);

    const newRole = await Role.create(body, {});
    res.status(200).send({
      status: "Sukses",
      data: newRole,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "cannot Add new Data",
    });
  }
};
