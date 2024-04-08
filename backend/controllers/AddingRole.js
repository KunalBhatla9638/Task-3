const { QueryTypes } = require("sequelize");
const sequelize = require("../utiles/database");

const AddRole = async (req, res) => {
  const { role } = req.body;
  if (!role) {
    return res.status(204).json({ error: "Enter the field" });
  }

  try {
    const exists = await sequelize.query("select * from roles where role = ?", {
      type: QueryTypes.SELECT,
      replacements: [role],
    });

    if (exists != 0) {
      return res.status(409).json({ error: "Role already exists" });
    }

    const roleQuery = await sequelize.query(
      "insert into roles (role) values (?)",
      {
        type: QueryTypes.INSERT,
        replacements: [role],
      }
    );

    if (roleQuery == null) {
      return res
        .status(406)
        .json({ error: "Something went wrong after insert" });
    }

    res.status(200).json({ success: "Created role successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Error" + err.message });
  }
};

module.exports = {
  AddRole,
};
