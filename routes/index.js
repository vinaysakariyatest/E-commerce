const express = require("express")
const fs = require("fs");
const router = express.Router()

// Exporting all routes generally
module.exports = fs.readdirSync(__dirname + "/").forEach(function (file) {
    if (file !== "index.js" && file.substr(-3) == ".js") {
      const routeName = file.replace(".js", "");
      router.use("/" + routeName, require("./" + routeName));
    }
  });

module.exports = router;