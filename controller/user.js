const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer");
const validation = require("../helpers/validation");
const randomstring = require("randomstring");

// Registration
exports.registration = async (req, res) => {
  try {
    const { error, value } = validation.registration.validate(req.body);

    if (error) {
      return res.status(500).json({ message: error.details[0].message });
    }
    
    const {
      firstName,
      lastName,
      email,
      password,
      streetAddress,
      postalCode,
      contact,
    } = req.body;

    // Check Email exist or Not
    const emailExist = await user.findOne({ email });

    if (emailExist) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const normalPassword = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    const registration = await user.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      streetAddress,
      postalCode,
      contact,
    });

    if (registration) {
      registration.password = undefined;

      const msg =
        "Your account has been registered in Ecommerce platform<br> <b>Your Login Credentials is:</b> <br><b>Email:</b> " +
        registration.email +
        "<br><b>Password:</b> " +
        normalPassword;

      mailer.sendMail(email, "Registration", msg);

      return res.status(201).json({
        message: "Registration successfully!",
        Details: registration,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { error, value } = validation.Login.validate(req.body);

    if (error) {
      return res.status(500).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    const userLogin = await user.findOne({ email });

    if (!userLogin) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const isMatch = await bcrypt.compare(password, userLogin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    } else {
      const token = jwt.sign(
        {
          id: userLogin._id,
          email: userLogin.email,
        },
        process.env.SECRET_KEY
      );
      res.header("Authorization", `${token}`)
      return res.status(200).json({
        message: "Login successfully"
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update password
exports.updatePassword = async (req, res) => {
  try {
    const userId = req.decoded.id;

    const userData = await user.findOne({ _id: userId });

    const existPassword = userData.password;

    const { oldPassword, newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({
        message: "Please enter a new password",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, existPassword);

    if (isMatch) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await user.findByIdAndUpdate(userId, {
        password: hashedPassword,
      });

      return res.status(200).json({
        message: "Password updated successfully",
      });
    } else {
      return res.status(400).json({
        message: "Old Password does not match",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Send Forget Password Link
exports.forget_password = async (req, res) => {
  try {
    const email = req.body.email;

    const userData = await user.findOne({ email });

    if (userData) {
      const randomString = randomstring.generate();

      await user.findOneAndUpdate(
        { email: email },
        { token: randomString },
        { new: true }
      );

      const msg = `
              <p>Hi ${userData.name},</p>
              <p>Please copy the link and <a href="http://localhost:4000/user/reset-password?token=${randomString}">reset your password</a>.</p>
          `;

      mailer.sendMail(email, "For Reset Password", msg);

      return res.status(200).json({
        message: "Please check your mail box and reset your Password",
      });
    } else {
      return res.status(400).json({ message: "Invalid Email" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Reset Password
exports.reset_password = async (req, res) => {
  try {
    const token = req.query.token;
    const tokenData = await user.findOne({ token });

    if (tokenData) {
      const password = req.body.password;
      const hashedPassword = await bcrypt.hash(password, 10);

      const resetPassword = await user.findOneAndUpdate(
        { _id: tokenData._id },
        { password: hashedPassword, token: "" },
        { new: true }
      );

      if (resetPassword) {
        return res
          .status(200)
          .json({ message: "Your password has been reset." });
      } else {
        return res.status(400).json({
          message: "Failed, Please try again",
        });
      }
    } else {
      return res.status(400).json({ message: "This link has expired." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// View Profile
exports.viewProfile = async (req, res) => {
    try {
        const userId = req.decoded.id;

        const myProfile = await user.findOne({ _id: userId });

        if(!myProfile){
            return res.status(404).json({
                message: "Profile not found",
            })
        }

        return res.status(200).json({
            Profile: myProfile
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}