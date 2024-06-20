const admin = require("../models/admin");
const category = require("../models/category");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validation = require("../helpers/validation")

// Admin Login
exports.login = async (req, res) => {
  try {
    const { error, value } = validation.Login.validate(req.body);

    if (error) {
      return res.status(500).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    const adminFind = await admin.findOne({ email });

    if (!adminFind) {
      return res.status(401).json({ message: "Invalid Email" });
    }

    const isMatch = await bcrypt.compare(password, adminFind.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    } else {
      const token = jwt.sign(
        {
          id: adminFind._id,
          email: adminFind.email,
        },
        process.env.SECRET_KEY
      );

      return res.status(200).json({
        message: "Login successful",
        token: token
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

