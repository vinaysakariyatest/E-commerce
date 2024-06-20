const brand = require("../models/brand");
const validation = require("../helpers/validation");

// Add Brand
exports.addBrand = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      req.body = [req.body];
    }
    const { error, value } = validation.brandArray.validate(req.body);

    if (error) {
      return res.status(500).json({ message: error.details[0].message });
    }

    const { name, logo } = req.body;

    const Brand = await brand.insertMany(req.body);

    return res.status(201).json({
      message: "Brand Added successfully",
      Brand: Brand,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update Brand
module.exports.editBrand = async (req, res) => {
  try {
    const id = req.params.id;

    const updateBrand = await brand.findByIdAndUpdate(id, {
      ...req.body,
    });

    if (updateBrand == null) {
      return res.status(404).json({
        message: "Brand not found",
      });
    }

    return res.status(200).json({
      message: "Brand updated",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete Brand
module.exports.deleteBrand = async (req, res) => {
  try {
    const id = req.params.id;

    const removeBrand = await brand.findByIdAndDelete(id);

    if (removeBrand == null) {
      return res.status(404).json({
        message: "Brand not found",
      });
    }

    return res.status(200).json({
      message: "Brand Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// View Brand
module.exports.viewBrand = async (req, res) => {
  try {
    const showBrand = await brand.find();

    if (showBrand == null) {
      return res.status(404).json({ message: "Brand is Empty" });
    }

    return res.status(200).json({
      Brands: showBrand,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
