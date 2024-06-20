const express = require('express');
const router = express.Router();

const {upload} = require("../helpers/multer")

const admin = require("../controller/admin");
const category = require("../controller/category");
const brand = require("../controller/brand");
const faq = require("../controller/FAQ");
const banner = require("../controller/banner");
const blog = require("../controller/blog");
const contactus = require("../controller/contactMessage");
const contact = require("../controller/contact")

// router.post("/add", admin.addAdmin)

router.post("/login",admin.login);

// Category
router.post("/category",category.addCategory);
router.put("/category/:id",category.editCategory);
router.delete("/category/:id",category.deleteCategory)
router.get("/category/",category.viewCategory);

// Brand
router.post("/brand",brand.addBrand);
router.put("/brand/:id",brand.editBrand);
router.delete("/brand/:id",brand.deleteBrand)
router.get("/brand/",brand.viewBrand);

// FAQ
router.post("/faq",faq.addFAQ);
router.put("/faq/:id",faq.editFAQ);
router.delete("/faq/:id",faq.deleteFAQ)
router.get("/faq/",faq.viewFAQ);

// Banner
router.post("/banner",upload.single("image"),banner.addBanner);
router.put("/banner/:id",banner.editBanner);
router.delete("/banner/:id",banner.deleteBanner)
router.get("/banner/",banner.viewBanner);

// Blog
router.post("/blog",upload.single("image"),blog.createBlog);
router.put("/blog/:id",blog.editBlog);
router.delete("/blog/:id",blog.deleteBlog)
router.get("/blog/",blog.viewBlog);

// ContactUS
router.post("/contactus",contactus.sentMessage);
router.delete("/contactus/:id",contactus.deleteMessage);
router.get("/contactus",contactus.viewMessage);

// Contact
router.post("/contact",contact.addContact);
router.put("/contact/:id",contact.editContact);
router.delete("/contact/:id",contact.deleteContact);
router.get("/contact",contact.viewContact);

module.exports = router