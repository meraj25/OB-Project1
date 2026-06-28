import CreateTaskDTO from "../domain/dto/CreateTaskDTO";
import Task from "../infrastructure/db/entities/Task";
import {Request,Response,NextFunction} from "express";
import mongoose from "mongoose";

const getallTasks = async (
    req:Request,
    res:Response,
    next:NextFunction

) =>{
    try{
        const tasks = await Task.find()
        .populate("creator", "name")
        .populate("assignees", "name");
        res.status(200).json(tasks);
    }catch(error){
      next(error)
    }
}

const createTask = async (
    req:Request, 
    res:Response, 
    next:NextFunction
) => {
    try{
        const newtask = CreateTaskDTO.safeParse(req.body);
       if(!newtask.success){
            console.log("Zod validation error:", newtask.error.format()) 
            return res.status(400).json({ error: newtask.error.format() }); 
        }

        const {name,description,status,creator,assignees} = newtask.data;

        const task = await Task.create({
            name,
            description,
            status,
            creator,
            assignees});
        
        res.status(201).json(task)
    }catch(error){
        next(error)
    }

}

const findtaskByAssignee = async(
    req:Request,
    res:Response,
    next:NextFunction

) => {
    try{
        const assigneeId = req.params.assigneeId as string;

        const filteredtasks = await Task.find({assignees: new mongoose.Types.ObjectId(assigneeId)})
        .populate("creator", "name")
        .populate("assignees", "name");
        
        if(filteredtasks.length === 0){
            return res.status(404).json({messsage: "No tasks have being created by this user"})
        }
        res.status(200).json(filteredtasks)
    }catch(error){
        next(error)
    }

}

interface StatusParams {
  status: "To Do" | "In Progress" | "Done";
}

const findtaskByStatus = async(
    req:Request<StatusParams>,
    res:Response,
    next:NextFunction
) => {
    try{

        const filterstatus = req.params.status;

        const filteredtasks = await Task.find({status:filterstatus})
        .populate("creator", "name")
        .populate("assignees", "name");

        if(filteredtasks.length === 0){
            return res.status(404).json({message:"Please select a valid status"})
        }

        res.status(200).json(filteredtasks)
    }catch(error){
        next(error)
    }
}

const updateTask = async(
    req:Request,
    res:Response,
    next:NextFunction
) => {
     try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      return res.status(404).json({message:"no task available for this"})

    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}

const deletetask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({message:"no task available "})
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};





export {getallTasks,createTask,findtaskByAssignee,findtaskByStatus,updateTask,deletetask};