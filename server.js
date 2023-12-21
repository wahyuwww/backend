require("dotenv").config();
// peckage
const express = require("express");
const helmet = require("helmet");
const CreateError = require("http-errors");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const xss = require("xss-clean");

// routing
const employeeClient = require("./src/routes/employee_client.routes");
const employee = require("./src/routes/employee.routes");
const authController = require("./src/routes/auth.routes");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
// app.use(helmet())
helmet({
  crossOriginResourcePolicy: false,
});
app.use(xss());
app.disable("x-powered-by");
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`example app listening at http://localhost:${PORT}`);
});

app.use("/employeeClient", employeeClient);
app.use("/employee", employee);
app.use("/auth", authController);

app.all("*", (req, res, next) => {
  next(new CreateError.NotFound());
});

app.use((err, req, res, next) => {
  const messError = err.message || "internal server error";
  const statusCode = err.message || 500;

  res.status(statusCode).json({
    message: messError,
  });
});
