import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  newUser,
} from "../controllers/user.js";
import { isAdmin } from "../middlewares/auth.js";

const app = express();

// route- /api/v1/user/new
app.post("/new", newUser);

// Route - /api/v1/user/all
app.get("/all", isAdmin, getAllUsers);

// Route - /api/v1/user/dynamicId
app.route("/:id").get(getUser).delete(isAdmin, deleteUser);

export default app;


/*
This code snippet demonstrates the setup of routes in an Express application using the `express` framework. Here's an explanation of the key components:

1. Import Statements:
   - `express`: The `express` module is imported to create the Express application.
   - `deleteUser`, `getAllUsers`, `getUser`, `newUser`: These functions are imported from the `../controllers/user.js` file. They likely handle different operations related to user management.
   - `isAdmin`: The `isAdmin` middleware function is imported from the `../middlewares/auth.js` file. It is used to check if a user has admin privileges.

2. Express Application Initialization:
   - An instance of the Express application is created and stored in the `app` constant.

3. Route Definitions:
   - `app.post("/new", newUser)`: Defines a POST route at `/api/v1/user/new` that calls the `newUser` controller function when the route is accessed.
   - `app.get("/all", isAdmin, getAllUsers)`: Defines a GET route at `/api/v1/user/all` that first runs the `isAdmin` middleware to check admin privileges and then calls the `getAllUsers` controller function to get all users.
   - `app.route("/:id").get(getUser).delete(isAdmin, deleteUser)`: Uses the `app.route()` method to define routes for dynamic user IDs. When a GET request is made to `/api/v1/user/:id`, it calls the `getUser` controller function. When a DELETE request is made, it first runs the `isAdmin` middleware and then calls the `deleteUser` controller function.

4. Export:
   - The Express application instance `app` is exported as the default export from this module.

Overall, this code sets up routes for creating new users, retrieving all users, and performing operations on a specific user based on their ID. It also includes middleware for authorization checks before accessing certain routes.
*/