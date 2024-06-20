const banner = require("../models/banner");
const validation = require("../helpers/validation");

const Upload = require("../helpers/coudinary")
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Add Banner
exports.addBanner = async (req, res) => {
  try {
    const { error, value } = validation.banner.validate(req.body);

    if (error) {
      return res.status(500).json({ message: error.details[0].message });
    }

    const { title, desc, image } = req.body;

   const upload = await Upload.uploadFile(req.file.path)

    if(!upload){
      return res.status(400).json({ message:"Please upload image"})
    }
    const crateBanner = await banner.create({
      title,
      desc,
      image:upload.secure_url
    });

    return res.status(201).json({
      message: "Banner Created successfully",
      Banner: crateBanner,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update Banner
module.exports.editBanner = async (req, res) => {
  try {
    const id = req.params.id;

    const updateBanner = await banner.findByIdAndUpdate(id, {
      ...req.body,
    });

    if (updateBanner == null) {
      return res.status(404).json({
        message: "Banner not found",
      });
    }

    return res.status(200).json({
      message: "Banner updated",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete Banner
module.exports.deleteBanner = async (req, res) => {
  try {
    const id = req.params.id;

    const removeBanner = await banner.findByIdAndDelete(id);

    if (removeBanner == null) {
      return res.status(404).json({
        message: "Banner not found",
      });
    }

    return res.status(200).json({
      message: "Banner Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// View Banner
module.exports.viewBanner = async (req, res) => {
    try {
        const banners = await banner.find();
      
        if (banners.length === 0) {
          return res.status(404).json({ message: "No banners found" });
        }
      
        // Filter banners where isActive is true
        const activeBanners = banners.filter(banner => banner.isActive);
      
        if (activeBanners.length === 0) {
          return res.status(404).json({ message: "No active banners found" });
        }
      
        // Return the active banners
        return res.status(200).json({ Banners: activeBanners });
      
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
      
};
