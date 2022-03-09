// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const { isAuthenticated } = require('./middleware/jwt.middleware')

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

// const projectRouter = require("./routes/project.routes");
// app.use("/api", projectRouter);     // <== UPDATE  WITH  app.use("/api", isAuthenticated, projectRouter);




const authRouter = require("./routes/auth.routes");          //  <== IMPORT
app.use("/auth", authRouter);                             //  <== ADD

const listRouter = require("./routes/list.routes");
app.use("/lists", listRouter);      // <== UPDATE  WITH  app.use("/api", isAuthenticated, taskRouter);
// app.use("/", isAuthenticated, listRouter);      // <== UPDATE  WITH  app.use("/api", isAuthenticated, taskRouter);

const itemRouter = require("./routes/item.routes");
app.use("/items", itemRouter);

const friendRouter = require("./routes/friend.routes");
app.use("/friends", friendRouter);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
