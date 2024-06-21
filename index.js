const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();

dotenv.config({ path: './.env'})
require("./db/connection")

app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.json({}))

// const adminRoute = require("./routes/admin");
// const userRoute = require("./routes/user")

// app.use("/admin",adminRoute);
// app.use("/user",userRoute);

app.use("/api/v1",require("./routes"))


const PORT = process.env.NODE_APP_PORT

app.listen(PORT, () => {
    console.log(`Server is running at PORT Number ${PORT}`)
})
