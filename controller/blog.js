const blog = require("../models/blog");
const validation = require("../helpers/validation");
const Upload = require("../helpers/coudinary")
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    const { error, value } = validation.blog.validate(req.body);

    if (error) {
      return res.status(500).json({ message: error.details[0].message });
    }
    const { title, content, image } = req.body;

    const upload = await Upload.uploadFile(req.file.path);

    const crateBlog = await blog.create({
      title,
      content,
      image: upload.secure_url
    });

    return res.status(201).json({
      message: "Blog Created successfully",
      Blog: crateBlog,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update Blog
module.exports.editBlog = async (req, res) => {
  try {
    const id = req.params.id;

    const updateBlog = await blog.findByIdAndUpdate(id, {
      ...req.body,
    });

    if (updateBlog == null) {
      return res.status(404).json({
        message: "Blog  not found",
      });
    }

    return res.status(200).json({
      message: "Blog  updated",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete Blog
module.exports.deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;

    const removeBlog = await blog.findByIdAndDelete(id);

    if (removeBlog == null) {
      return res.status(404).json({
        message: "Blog  not found",
      });
    }

    return res.status(200).json({
      message: "Blog  Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// View Blog
module.exports.viewBlog = async (req, res) => {
  try {
    const showBlog = await blog.find();

    if (showBlog.length === 0) {
      return res.status(404).json({ message: "No Blog found" });
    }

    // Filter Blogs where isActive is true
    const activeBlogs = showBlog.filter((blogs) => blogs.isActive);

    if (activeBlogs.length === 0) {
      return res.status(404).json({ message: "No active Blogs found" });
    }

    // Return the active Blogs
    return res.status(200).json({ Blogs: activeBlogs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// View Single Blog
exports.singleBlog = async (req, res) => {
  try {
    const id = req.params.id;

    const viewBlog = await blog.findById(id);

    if (!viewBlog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      Blog: viewBlog,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
