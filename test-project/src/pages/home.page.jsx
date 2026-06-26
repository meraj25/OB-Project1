import React from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import TaskCard from "@/components/TaskCard";
import { 
    useGetAllTasksQuery,
    useCreateTaskMutation,
    useGetTaskByAssigneeQuery,
    useGetTaskByStatusQuery,
    useGetuserQuery,
 } from "@/lib/api";
 import CreateTask from "@/components/CreateTask";

export default function HomePage(){
    
    const {data: tasks = [],isLoading,isError,error} = useGetAllTasksQuery();

    const {data: user} = useGetuserQuery();

    const createtask = useCreateTaskMutation();

    return(
        <div>
            <Navigation/>
            <main className="px-5 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Task Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage and track all your tasks in one place.
          </p>
        </div>

        <div className="flex gap-3">
           <div>
            <Button>All Tasks</Button>
            <Button variant="outline">My Tasks</Button>
            </div>
            <div>

                {/*filtering section */}

            </div>
            <div>
            <CreateTask user={user}/>
            </div>

        </div>

        <section>
            {tasks.map((task) =>(
                <TaskCard key={task._id} task={task}/>
            ))};
        </section>
      </main>

        </div>
    )
}