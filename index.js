const express = require("express");
const app = express();
// const cors = require("cors");
const db = require("./db");

require("dotenv").config();

// app.use(cors());
app.use(express.json());
const roleRouter = require("./routers/routes/role");
app.use(roleRouter);

const userRouter = require("./routers/routes/user");
app.use(userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
