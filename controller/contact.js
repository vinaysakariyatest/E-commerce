const contactModel = require("../models/contact");
const validation = require("../helpers/validation");

// Add Contact Data
exports.addContact = async (req, res) => {
  try {
    const { error, value } = validation.contact.validate(req.body);

    if (error) {
      return res.status(500).json({ message: error.details[0].message });
    }

    const { conpany_name, email, contact, address } = req.body;

    const createContact = await contactModel.create({
      conpany_name,
      email,
      contact,
      address,
    });

    return res.status(201).json({
      message: "Contact Added successfully",
      Contactdata: createContact,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Edit Contact Data
exports.editContact = async (req, res) => {
  try {
    const id = req.params.id;

    const updateContact = await contactModel.findByIdAndUpdate(id, {
      ...req.body,
    });

    if (updateContact == null) {
      return res.status(404).json({
        message: "Contact Data not found",
      });
    }

    return res.status(200).json({
      message: "Contact Data updated",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete Category
exports.deleteContact = async (req, res) => {
    try {
      const id = req.params.id;
  
      const contactData = await contactModel.findByIdAndDelete(id);
  
      if (contactData == null) {
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

// View Contact Data
exports.viewContact = async (req, res) => {
  try {
    const showContactData = await contactModel.find();

    if (showContactData == null) {
      return res.status(404).json({ message: "Contact Data is Empty" });
    }

    return res.status(200).json({
      ContactData: showContactData,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
