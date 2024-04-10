const { QueryTypes } = require("sequelize");
const sequelize = require("../utiles/database");

const listProducts = async (req, res) => {
  try {
    const data = await sequelize.query("select * from products", {
      type: QueryTypes.SELECT,
    });

    if (data.length == 0) {
      return res.status(204).json({ error: "Nothing to show....!" });
    }

    res.status(200).json({ status: "success", data });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", msg: err.message });
  }
};

const addProducts = async (req, res) => {
  const { categoryName, description, categoryId, price } = req.body;
  const { userRole, id } = req.obj;

  const productImages = [];

  req.files.forEach((file) => {
    productImages.push(file.originalname);
  });

  if (!categoryName) {
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

const updateProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    const { categoryName, description, categoryId, price } = req.body;
    const { userRole, id } = req.obj;

    const productImages = [];
    req.files.forEach((file) => {
      productImages.push(file.originalname);
    });

    const [checkProduct] = await sequelize.query(
      "select * from products where id = ?",
      {
        type: QueryTypes.SELECT,
        replacements: [productId],
      }
    );

    if (checkProduct == undefined) {
      return res.status(404).json({ error: "Product not found" });
    }

    const [categoryDetail] = await sequelize.query(
      "select * from categories where id = ?",
      {
        type: QueryTypes.SELECT,
        replacements: [categoryId],
      }
    );
    if (categoryDetail == undefined) {
      return res.status(404).json({ error: "No category found....!" });
    }

    if (userRole != 1) {
      if (id != categoryDetail.createdBy) {
        return res.status(400).json({
          error: `Category does not belong's to you Mr.${firstname} you cannot update the product`,
        });
      }
    }

    const updateProduct = await sequelize.query(
      `UPDATE "products" SET "name" = ?, "description" = ?, "categoryId" = ?, "price" = ?, "images" = ? WHERE "products"."id" = ?`,
      {
        type: QueryTypes.UPDATE,
        replacements: [
          categoryName,
          description,
          categoryId,
          price,
          JSON.stringify(productImages) || "Random",
        ],
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  listProducts,
  addProducts,
  updateProducts,
};
