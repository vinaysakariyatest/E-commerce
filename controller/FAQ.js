const FAQ = require("../models/FAQ");
const validation = require("../helpers/validation");

// Add Brand
exports.addFAQ = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
        req.body = [req.body];
      }

    const { error, value } = validation.faqArray.validate(req.body);

    if (error) {
      return res.status(500).json({ message: error.details[0].message });
    }

    // const { question, answer } = req.body;

    const faq = await FAQ.insertMany(req.body);

    return res.status(201).json({
      message: "FAQ Added successfully",
      FAQ: faq,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update FAQ
module.exports.editFAQ = async (req, res) => {
  try {
    const id = req.params.id;

    const updateFAQ = await FAQ.findByIdAndUpdate(id, {
      ...req.body,
    });

    if (updateFAQ == null) {
      return res.status(404).json({
        message: "FAQ not found",
      });
    }

    return res.status(200).json({
      message: "FAQ updated",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete FAQ
module.exports.deleteFAQ = async (req, res) => {
  try {
    const id = req.params.id;

    const removeFAQ = await FAQ.findByIdAndDelete(id);

    if (removeFAQ == null) {
      return res.status(404).json({
        message: "FAQ not found",
      });
    }

    return res.status(200).json({
      message: "FAQ Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// View FAQ
module.exports.viewFAQ= async (req, res) => {
  try {
    const showFAQ = await FAQ.find();

    if (showFAQ == null) {
      return res.status(404).json({ message: "FAQ is Empty" });
    }

    return res.status(200).json({
        FAQ: showFAQ,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
