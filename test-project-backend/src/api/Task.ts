import express from "express"
import { getallTasks,createTask,findtaskByAssignee,findtaskByStatus,updateTask,deletetask } from "../application/Task"

const TaskRouter = express.Router();

TaskRouter
    .route("/")
    .get(getallTasks)

TaskRouter
    .route("/createTask")
    .post(createTask)

TaskRouter
    .route("/:assigneeId")
    .get(findtaskByAssignee)

TaskRouter
    .route("/status/:status")
    .get(findtaskByStatus)

TaskRouter
    .route("/:id")
    .patch(updateTask)
    .delete(deletetask)


export default TaskRouter;