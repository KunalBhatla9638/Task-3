const { QueryTypes } = require("sequelize");
const sequelize = require("../utiles/database");

//*List category for both user & admin
const listCategory = async (req, res) => {
  try {
    const { id, userRole } = req.obj;

    if (userRole != 1) {
      const showCategoryByUser = await sequelize.query(
        "select * from categories where createdBy = ?",
        {
          type: QueryTypes.SELECT,
          replacements: [id],
        }
      );

      if (showCategoryByUser.length == 0) {
        return res.status(400).json({
          error: "NOTHING! to show, you don't have any category",
        });
      }

      res.status(200).json({ status: "success", showCategoryByUser });
    } else {
      const showCategoryByAdmin = await sequelize.query(
        "select * from categories",
        {
          type: QueryTypes.SELECT,
        }
      );

      if (showCategoryByAdmin.length == 0) {
        return res.status(400).json({
          error: "NOTHING! to show, there's no category exist",
        });
      }

      res.status(200).json({ status: "success", showCategoryByAdmin });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//*Add category for both user & admin
const addCategory = async (req, res) => {
  const { categoryName } = req.body;

  if (!categoryName) {
    return res.status(400).json({ error: "Category field is empty" });
  }

  try {
    const { id, userRole } = req.obj;

    const checkCategory = await sequelize.query(
      "select * from categories where categoryname = ?",
      {
        type: QueryTypes.SELECT,
        replacements: [categoryName.toLowerCase()],
      }
    );

    if (checkCategory.length != 0) {
      return res.status(409).json({ error: "Category name already exist" });
    }

    const addCategoryQuery = await sequelize.query(
      "insert into categories (categoryname, createdBy) values (?, ?)",
      {
        type: QueryTypes.INSERT,
        replacements: [categoryName.toLowerCase(), id],
      }
    );

    if (!addCategoryQuery) {
      return res
        .status(400)
        .json({ error: `error creating the categorie by user id ${id}` });
    }

    res.status(200).json({
      status: "success",
      msg: `Created '${categoryName}' Successfully`,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }

  // if (userRole != 1) {
  // } else {
  // }
};

//*Update category for both user & admin
const updateCategory = async (req, res) => {
  const { updateCategoryName } = req.body;
  const { firstname, userRole } = req.obj;

  if (!updateCategoryName) {
    return res.status(400).json({ error: "Update category field is empty" });
  }
  try {
    const categoryId = req.params.id;
    const { id } = req.obj;

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
          error: `Category does not belong's to you Mr.${firstname}`,
        });
      }
    }

    const checkUpdatedCategoryName = await sequelize.query(
      "select * from categories where categoryname = ?",
      {
        type: QueryTypes.SELECT,
        replacements: [updateCategoryName.toLowerCase()],
      }
    );

    if (checkUpdatedCategoryName.length != 0) {
      return res
        .status(409)
        .json({ error: "The new category name already exist" });
    }

    const changeCategoryNameQuery = await sequelize.query(
      "UPDATE `categories` SET `categoryname` = ? WHERE `categories`.`id` = ?",
      {
        type: QueryTypes.UPDATE,
        replacements: [updateCategoryName.toLowerCase(), categoryDetail.id],
      }
    );

    if (!changeCategoryNameQuery) {
      return res
        .status(400)
        .json({ error: "Something happen while updating the query" });
    }

    res.status(200).json({
      status: "success",
      msg: `'${categoryDetail.categoryname}' is changed to '${updateCategoryName}'`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//*Delete category for both user & admin
const deleteCategory = async (req, res) => {
  const { firstname, userRole, gender } = req.obj;
  try {
    const categoryId = req.params.id;
    const { id } = req.obj;

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

    const checkProductWithThatCategoryExsits = await sequelize.query(
      `
        SELECT * from products
    JOIN categories on categories.id = products.categoryId
    WHERE products.categoryId = ?
        `,
      {
        type: QueryTypes.SELECT,
        replacements: [categoryId],
      }
    );

    if (checkProductWithThatCategoryExsits.length != 0) {
      return res
        .status(400)
        .json({ error: "Product with this category exist cannot delete this" });
    }

    if (userRole != 1) {
      const holder = gender == "Male" ? "Mr." : "Miss.";
      if (id != categoryDetail.createdBy) {
        return res.status(400).json({
          error: `DELETION ABORTED, Category does not belong's to you ${
            holder + firstname
          }`,
        });
      }
    }

    await sequelize.query(
      "DELETE FROM `categories` WHERE `categories`.`id` = ?",
      {
        type: QueryTypes.DELETE,
        replacements: [categoryDetail.id],
      }
    );

    res.status(200).json({
      status: "success",
      msg: `Category named '${categoryDetail.categoryname}' is deleted`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//*Get all the category that are shown and used in the products
const getCategory = async (req, res) => {
  try {
    const result = await sequelize.query(
      `select DISTINCT categories.categoryname from categories 
            RIGHT JOIN products on categories.id = products.categoryId`,
      {
        type: QueryTypes.SELECT,
      }
    );

    if (!result) {
      return res.status(400).json({
        error: "Error while selecting the result according to the category",
      });
    }

    res.status(200).json({ status: "success", result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  listCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  getCategory,
};
