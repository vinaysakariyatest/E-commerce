const category = require("../models/category");
const validation = require("../helpers/validation");

// Add Category
module.exports.addCategory = async (req, res) => {
  try {
    const { error, value } = validation.category.validate(req.body);

    if (error) {
      return res.status(500).json({ message: error.details[0].message });
    }

    const { name } = req.body;

    const addCategory = await category.create({ name });

    return res.status(200).json({
      message: "Categoey Added successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update Category
module.exports.editCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const updateCategory = await category.findByIdAndUpdate(id, {
      ...req.body,
    });

    if (updateCategory == null) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json({
      message: "Category updated",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete Category
module.exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const Categoey = await category.findByIdAndDelete(id);

    if (Categoey == null) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json({
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// View Category
module.exports.viewCategory = async (req, res) => {
  try {
    const Category = await category.find()

    if(Category == null){
        return res.status(404).json({ message: "category is Empty"})
    }

    return res.status(200).json({
        Categories: Category
    })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

