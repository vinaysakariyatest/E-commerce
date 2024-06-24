const RoleModel = require("../models/role");
const validation = require("../helpers/validation");
const { default: mongoose } = require("mongoose");

exports.addRole = async (req, res) => {
  try {
    const { error, value } = validation.role.validate(req.body);

    if (error) {
      return res.status(500).json({ message: error.details[0].message });
    }

    const { roleName, permissions } = req.body;

    const existRole = await RoleModel.findOne({ roleName });

    if(existRole){
        return res.status(403).json({
            message: "Role already exists"
        })
    }

    const createRole = await RoleModel.create({
        roleName,
        permissions
    })

    return res.status(200).json({
        message: "Role Added successfully",
        Role: createRole
    })
  } catch (error) {
    return res.status(500).json({ message: error.message})
  }
};

// Update Role
exports.updateRole = async (req, res) => {
    try {
        const id = req.params.id
        const roleId = await RoleModel.findById({ _id: id});

        if(!roleId) {
            return res.status(404).json({
                message: "Role not found",
            })
        }

        const check = [...new Set(req.body.permissions)];

        const updateObj = {};

        if(req.body.roleName){
            updateObj.roleName = req.body.roleName
        }

        if(req.body.permissions && req.body.permissions.length > 0){
            updateObj.$addToSet = { permissions: { $each: [...check] } };

        }

        const updateDetails = await RoleModel.findByIdAndUpdate(
            { _id: roleId._id },
            updateObj,
            { new: true }
        );

        res.status(200).json({
            message: "Update successfully",
            updateDetails,
        });
    } catch (error) {
    return res.status(500).json({ message: error.message})
        
    }
}
