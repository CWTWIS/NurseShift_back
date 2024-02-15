require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const limiter = require("./middlewares/rate-limit");
const error = require("./middlewares/error");
const notFound = require("./middlewares/not-found");

const authRoute = require("./routes/auth-route");
const positionRoute = require("./routes/position-route");
const departmentRoute = require("./routes/department-route");
const shiftTypeRoute = require("./routes/shift-type-route");
const shiftRoute = require("./routes/shift-route");

const app = express();

app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(morgan("dev"));

app.use("/auth", authRoute);
app.use("/position", positionRoute);
app.use("/department", departmentRoute);
app.use("/shiftType", shiftTypeRoute);
app.use("/shift", shiftRoute);

app.use(notFound);
app.use(error);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
