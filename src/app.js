const express = require('express');
const app = express();
const langMiddleware = require("./middlewares/lang.middleware");
app.use(express.json());
app.use(langMiddleware);
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});
const coursesRoutes = require("./routes/courses.routes");
app.use("/api/cources", coursesRoutes);
const enrollmentsRoute = require("./routes/enrolments.routes");


const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

module.exports = app;