const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

const branchRoutes = require("./routes/branchRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const userRoutes = require("./routes/userRoutes");




app.use(cors({ origin: true }));
app.use(helmet());
app.use(express.json());

//routes
app.use("/branches", branchRoutes);
app.use("/services", serviceRoutes);
app.use("/users", userRoutes);




exports.api = functions.https.onRequest(app);
