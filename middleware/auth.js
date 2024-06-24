const jwt = require("jsonwebtoken");
const UserModel = require("../models/user")
const AdminModel = require("../models/admin")

exports.check_token = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.decoded = decoded

        const user = await UserModel.findById(decoded.id)

        if(!user){
            return res.status(404).json({
                message: 'User not found'
            })
        }
        next()
    } catch (error) {
        console.log(error);
        return res.status(402).json({
            message: "Unauthorized access"
        })
    }
}

// exports.check_admin = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization
//         const decoded = jwt.verify(token, process.env.SECRET_KEY)
//         req.decoded = decoded

//         const admin = await AdminModel.findById(decoded.id)

//         if(!admin){
//             return res.status(404).json({
//                 message: "Admin not found"
//             })
//         }
//         next()
//     } catch (error) {
//         console.log(error);
//         return res.status(402).json({
//             message: "Unauthorized access"
//         })
//     }
// }

exports.authorize = async (req, res, next) => {
    try {

        const token = req.headers.authorization
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.decoded = decoded

        const adminData =await AdminModel.findOne({ email: "admin@gmail.com" })

        const admin = await AdminModel.findById(decoded.id)
        
        if(!admin){
            return res.status(404).json({
                message: "You can't access this URL"
            })
        }

        const tokenId = req.decoded.id;
        const adminId = await adminData._id.toString();

        if(tokenId !== adminId){
            return res.status(403).json({
                message: "You can't access this URL"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Unauthorized access' })
    }
}