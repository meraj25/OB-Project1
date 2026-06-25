import express from "express"
import { getallTasks,createTask,findtaskByAssignee,findtaskByStatus } from "../application/Task"

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
    .get(findtaskByAssignee)


export default TaskRouter;