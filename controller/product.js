const product = require("../models/product");
const categoryModel = require("../models/category");
const brandModel = require("../models/brand");
const validation = require("../helpers/validation");

const Upload = require("../helpers/coudinary");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Add Products
exports.addProduct = async (req, res) => {
  try {
    const { error, value } = validation.product.validate(req.body);

    if (error) {
      return res.status(500).json({ message: error.details[0].message });
    }

    const { pname, desc, image, images, brand, price, category, stock } =
      req.body;

    // Category Exist or not
    const findCategory = await categoryModel.findById(category);

    if (!findCategory) {
      return res.status(404).json({
        message: "Category does not exist",
      });
    }

    // Brandf Exist or not
    const findBrand = await brandModel.findById(brand);

    if (!findBrand) {
      return res.status(404).json({
        message: "Brand does not exist",
      });
    }

    // Check if the main image is uploaded
    if (!req.files.image || !req.files.image[0]) {
      return res.status(400).json({ message: "Please upload the main image." });
    }

    // Upload the main image
    const mainImageUpload = await Upload.uploadFile(req.files.image[0].path);
    if (!mainImageUpload) {
      return res.status(400).json({ message: "Failed to upload main image." });
    }

    // Upload additional images if provided
    let additionalImages = [];
    if (req.files.images) {
      for (let file of req.files.images) {
        const imageUpload = await Upload.uploadFile(file.path);
        if (imageUpload) {
          additionalImages.push(imageUpload.secure_url);
        } else {
          return res.status(400).json({
            message: "Failed to upload one of the additional images.",
          });
        }
      }
    }

    // Create new product
    const productAdd = await product.create({
      pname,
      desc,
      image: mainImageUpload.secure_url,
      images: additionalImages,
      brand,
      price,
      category,
      stock,
    });

    return res.status(201).json({
      message: "Product added successfully",
      Products: productAdd,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if req.files.image exists before uploading
    let mainImageUpload;
    if (req.files && req.files.image && req.files.image.length > 0) {
      mainImageUpload = await Upload.uploadFile(req.files.image[0].path);
    }

    let additionalImages = [];
    if (req.files && req.files.images && req.files.images.length > 0) {
      for (let file of req.files.images) {
        const imageUpload = await Upload.uploadFile(file.path);
        if (imageUpload) {
          additionalImages.push(imageUpload.secure_url);
        }
      }
    }

    // Prepare update object, including image if uploaded
    const updateObject = { ...req.body };
    if (mainImageUpload) {
      updateObject.image = mainImageUpload.secure_url;
    }

    if (additionalImages.length > 0) {
      // Check if additionalImages array is not empty
      updateObject.images = additionalImages;
    }

    const editProduct = await product.findByIdAndUpdate(id, updateObject, {
      new: true,
    });

    if (!editProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Respond with success message
    return res.status(200).json({
      message: "Product updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete Product
module.exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const removeProduct = await product.findByIdAndDelete(id);

    if (removeProduct == null) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// View Products
exports.viewProduct = async (req, res) => {
  try {
    const showProduct = await product
      .find()
      .populate("brand", "name")
      .populate("category", "name");

    if (!showProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      Products: showProduct,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// View Single Product
exports.singleProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const viewProduct = await product.findById(id);

    if (!viewProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      Product: viewProduct,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// View Product Category wise
exports.categoryproduct = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const getCategoryProduct = await product
      .find({ category: categoryId })
      .populate("category", "name")
      .populate("brand", "name");

    if (getCategoryProduct.length === 0) {
      return res.status(404).json({
        message: "No Products found in this category",
      });
    } else {
      return res.status(200).json({
        Products: getCategoryProduct,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
