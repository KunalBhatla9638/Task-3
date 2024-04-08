const sequelize = require("../utiles/database");
const { QueryTypes } = require("sequelize");
const Joi = require("joi");

//Validator
const { hashPassword } = require("../helper/SecurePassword");

const welcome = (req, res) => {
  res.send("hello");
};

const addUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, gender, hobbies, userRole } =
      req.body;

    const profile_pic = req.file.filename;
    // const profile_pic = "Static";

    console.log(firstname + profile_pic);

    if (!firstname) {
      return res.status(400).json({ error: "Firstname cannot be empty" });
    }

    if (!lastname) {
      return res.status(400).json({ error: "Lastname cannot be empty" });
    }

    if (!email) {
      return res.status(400).json({ error: "Email cannot be empty" });
    }

    if (!uemail.endsWith("@gmail.com" || "@email.com" || "@yahoo.com")) {
      return res
        .status(550)
        .json({ Error: "User Unknown - Email must be from example.com" });
    }

    if (!password) {
      return res.status(400).json({ error: "Password cannot be empty" });
    }

    if (!gender) {
      return res.status(400).json({ error: "Gender cannot be empty" });
    }

    if (!hobbies || hobbies.length === 0) {
      return res.status(400).json({ error: "Hobbies cannot be empty" });
    }

    // if (!userRole) {
    //   return res.status(400).json({ error: "UserRole cannot be empty" });
    // }

    if (!profile_pic) {
      return res.status(400).json({ error: "Profile picture cannot be empty" });
    }

    const checkEmail = await sequelize.query(
      "select * from users where email = ?",
      {
        type: QueryTypes.SELECT,
        replacements: [email],
      }
    );

    if (checkEmail.length != 0) {
      return res.status(409).json({ error: "Email already exist" });
    }

    //One Admin only
    if (userRole == 1) {
      const adminUser = sequelize.query(
        `select * from users where userRole = 1`
      );
      if (adminUser != 0) {
        return res.status(409).json({ error: "Admin already exist" });
      }
    }

    //insertData
    const securePassword = await hashPassword(password);
    const userCreated = await sequelize.query(
      "INSERT INTO `users` (`firstname`, `lastname`, `email`, `password`, `gender`, `hobbies`, `userRole`, `profile_pic`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      {
        type: QueryTypes.INSERT,
        replacements: [
          firstname,
          lastname,
          email,
          securePassword,
          gender,
          hobbies,
          userRole || "2",
          profile_pic,
        ],
      }
    );

    if (userCreated == undefined) {
      res.status(400).json({ error: "Error while creating the user" });
    }
    res
      .status(200)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  welcome,
  addUser,
};
