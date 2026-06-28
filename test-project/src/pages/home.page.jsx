import React from "react";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useGetuserQuery} from "@/lib/api";
import CreateTask from "@/components/CreateTask";
import CreatedbyMe from "@/components/MyTasks";
import Tasks from "@/components/Tasks";
export default function HomePage(){
    

    const {data:{user}={} , error } = useGetuserQuery();
   
    const [activeView , setActiveView] = useState("all");

    const [taskKey, setTaskKey] = useState(0);


    return(
        <div>
            <Navigation user={user}/>
            <main className="px-5 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Task Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage and track all your tasks in one place.
          </p>
        </div>

        <div className="flex items-center justify-between mb-5">
           <div className="flex gap-2">
            <Button 
            onClick={()=>{
              setActiveView("all")
              setTaskKey(prev => prev + 1);}}
            
            variant={activeView=== "all" ? "default" : "outline"}>
            All Tasks
            </Button>

            <Button 
            onClick={()=>setActiveView("mine")}
            variant={activeView === "mine"? "default" : "outline"}>
           Tasks by me
            </Button>
            </div>

            
            
            <CreateTask user={user}/>

        </div>

        {activeView === "all" ? (<Tasks key={taskKey} user={user}/>) : (<CreatedbyMe  user={user}/>)}

        
      </main>

        </div>
    )
}