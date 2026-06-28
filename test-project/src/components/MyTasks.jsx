import { useState } from "react";
import TaskCard from "./TaskCard";
import { useGetAllTasksQuery } from "@/lib/api";
import { Button } from "./ui/button";


const task_per_page = 12;

function CreatedbyMe({user}){



    const{data: tasks = []} = useGetAllTasksQuery();

    const displayTasks = tasks?.filter((task) => task.creator.name === user?.name) ?? [];
    const [currentPage , setCurrentPage] = useState(1)

    const totalPages = Math.ceil(displayTasks.length / task_per_page);
    const startIndex = (currentPage - 1) * task_per_page;
    const paginatedTasks = displayTasks.slice(startIndex, startIndex + task_per_page);

    return(
        <div>

             <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {paginatedTasks.map((task) => (
                            <TaskCard key={task._id} task={task}  showDelete={true}/>
                        ))}
             </div>

            {totalPages > 1 && (
                 <div className="flex items-center justify-center gap-2">
                 <Button
                 variant="outline"
                 size="sm"
                 onClick={() => setCurrentPage((prev) => prev - 1)}
                 disabled={currentPage === 1}
                 >
                  Previous
                 </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                 key={page}
                 variant={currentPage === page ? "default" : "outline"}
                 size="sm"
                 onClick={() => setCurrentPage(page)}
                 >
                  {page}
                 </Button>
                 ))}

                <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
                 >
                 Next
                </Button>
            </div>
            )}

             <p className="text-center text-xs text-muted-foreground">
                Page {currentPage} of {totalPages}
            </p>


        </div>
    )
}

export default CreatedbyMe;