const UserController = require("../controllers/user.controller");
module.exports = (app) => {
    //admin routes for viewing all users in the system and deleting users accounts
    app.get("/api/users", UserController.getAllUsers)
    app.post("/api/users/register", UserController.registerUser)
    app.post("/api/users/login", UserController.login)
    app.get("/api/users/getloggedinuser", UserController.getLoggedInUser)
    app.get("/api/users/logout", UserController.logout)
    app.delete("/api/users/delete/:_id", UserController.deleteAnExistingUser, UserController.logout);
    app.patch("/api/users/update/:_id", UserController.updateExistingUser);

    //To Do List Routes
    app.get("/api/users/getUserTodos/:toDoID", UserController.getATodo)
    app.post("/api/users/addTodo/:_id", UserController.addTodos);


    app.put("/api/users/updateATodo/:_id", UserController.updateATodo)

    app.put("/api/users/deleteTodo/:userid/:toDoID", UserController.deleteAnTodo);
}