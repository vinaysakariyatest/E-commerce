const contactus = require("../models/contactus");
const validation = require("../helpers/validation");

// Create Message
exports.sentMessage = async (req, res) => {
  try {
    const { error, value } = validation.contactus.validate(req.body);

    if (error) {
      return res.status(500).json({ message: error.details[0].message });
    }

    const { name, email, contact, message } = req.body;

    const sendMessage = await contactus.create({
        name,
        email,
        contact,
        message
    })

    return res.status(200).json({
        message: "data sent successfully",
        Message: sendMessage
    })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete Message
module.exports.deleteMessage = async (req, res) => {
  try {
    const id = req.params.id;

    const removeMessage = await contactus.findByIdAndDelete(id);

    if (removeMessage == null) {
      return res.status(404).json({
        message: "Contact Data not found",
      });
    }

    return res.status(200).json({
      message: "Contact Data Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// View ContactUs Data
module.exports.viewMessage = async (req, res) => {
  try {
    const contactData = await contactus.find()

    if(contactData == null){
        return res.status(404).json({ message: "Contact Data is Empty"})
    }

    return res.status(200).json({
        ContactData: contactData
    })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// View single ContactUs Data
exports.singleMessage = async (req, res) => {
  try {
    const id = req.params.id;

    const viewMessage = await contactus.findById(id);

    if (!viewMessage) {
      return res.status(404).json({
        message: "Data not found",
      });
    }

    return res.status(200).json({
      Data: viewMessage,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

