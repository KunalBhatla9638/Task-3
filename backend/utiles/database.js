const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("test", "root", "", {
  host: "localhost",
  logging: false,
  dialect: "mysql",
});

(() => {
  try {
    sequelize.authenticate();
    console.log("Connected to the database successfully");
  } catch (err) {
    console.log(err.message);
  }
})();

module.exports = sequelize;
