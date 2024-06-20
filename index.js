const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();

dotenv.config({ path: './.env'})
require("./db/connection")

app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.json({}))

const adminRoute = require("./routes/admin");

app.use("/admin",adminRoute);


const PORT = process.env.NODE_APP_PORT

app.listen(PORT, () => {
    console.log(`Server is running at PORT Number ${PORT}`)
})
