const { QueryTypes } = require("sequelize");
const sequelize = require("../utiles/database");

const listProducts = (req, res) => {
  res.send("List all products");
};

const addProducts = async (req, res) => {
  const { categoryName, description, categoryId, price } = req.body;
  const { userRole, id } = req.obj;

  const productImages = [];

  req.files.forEach((file) => {
    productImages.push(file.originalname);
  });

  if (!categoryName || categoryName.trim() === "") {
    return res.status(400).json({
      message: "Name is required",
    });
  }

  if (!description || description.trim() === "") {
    return res.status(400).json({
      message: "Description is required",
    });
  }

  if (!categoryId || categoryId.trim() === "") {
    return res.status(400).json({
      message: "Category ID is required",
    });
  }

  if (!price || isNaN(price) || price <= 0) {
    return res.status(400).json({
      message: "Price must be a positive number",
    });
  }

  if (
    !productImages ||
    !Array.isArray(productImages) ||
    productImages.length === 0
  ) {
    return res.status(400).json({
      message: "At least one image is required",
    });
  }

  try {
    const nameExist = await sequelize.query(
      "select * from products where name = ?",
      {
        type: QueryTypes.SELECT,
        replacements: [categoryName],
      }
    );
    if (nameExist.length != 0) {
      return res.status(409).json({ error: "Name already in use" });
    }

    const checkCategory = await sequelize.query(
      "select * from categories where id = ?",
      {
        type: QueryTypes.SELECT,
        replacements: [categoryId],
      }
    );

    if (checkCategory == 0) {
      return res.status(400).json({ error: "Category does not exist." });
    }

    if (userRole != 1) {
      const checkCategoryByUser = await sequelize.query(
        `select id from categories where id = ? and createdBy = ?`,
        {
          type: QueryTypes.SELECT,
          replacements: [categoryId, id],
        }
      );

      if (checkCategoryByUser == 0) {
        return res
          .status(404)
          .json({ error: "Category is not created by you" });
      }
    }

    const insertProduct = await sequelize.query(
      "INSERT INTO `products` (`name`, `description`, `categoryId`, `price`, `images`) VALUES (?, ?, ?, ?, ?);",
      {
        type: QueryTypes.INSERT,
        replacements: [
          categoryName,
          description,
          categoryId,
          price,
          JSON.stringify(productImages),
        ],
      }
    );
    //Insert into productimages table
    const insertProductImages = await sequelize.query(
      "INSERT INTO `productphotos` (productId, photo_name) VALUES (?, ?);",
      {
        type: QueryTypes.INSERT,
        replacements: [insertProduct[0], JSON.stringify(productImages)],
      }
    );

    res.status(200).json({ status: "success" });

    //RETRIVE QUERY for particular -> select * from products LEFT JOIN categories on products.categoryId = categories.id LEFT JOIN users on categories.createdBy = users.id WHERE users.id = 3;
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal server error", msg: err.message });
  }
};

module.exports = {
  listProducts,
  addProducts,
};
