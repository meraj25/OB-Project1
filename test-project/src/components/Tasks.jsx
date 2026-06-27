import { useState } from "react";
import { 
    useGetTaskByAssigneeQuery,
    useGetTaskByStatusQuery,
    useGetAllTasksQuery,
    useGetAllUsersQuery
 } from "@/lib/api";

import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue, } from "./ui/select";
import TaskCard from "./TaskCard";

const task_per_page = 12;
const status_options = ["To Do", "In Progress", "Done"];


function Tasks() {

    const [selectedAssigneeId, setSelectedAssigneeId] = useState("");
    const[selectedStatus, setSelectedStatus] = useState("") 

    const {data: users=[]} = useGetAllUsersQuery();
    const {data: allTasks=[]} = useGetAllTasksQuery();

    const [currentPage , setCurrentPage] = useState(1);
    

    const {data: filteredbyAssignee=[]} = useGetTaskByAssigneeQuery(selectedAssigneeId);
    const{data: filteredbyStatus=[]} = useGetTaskByStatusQuery(selectedStatus);

    const displayTasks = () => {
        if(selectedAssigneeId && selectedStatus){
            return filteredbyAssignee?.filter((task) => task.status === selectedStatus)
        }
        if(selectedAssigneeId){
            return filteredbyAssignee ?? [];
        }
        if(selectedStatus){
            return filteredbyStatus ?? [];
        }

        return allTasks ?? []
    }

    const alldisplayedTasks = displayTasks();

    const totalPages = Math.ceil(alldisplayedTasks.length / task_per_page);
    const startIndex = (currentPage - 1) * task_per_page;
    const paginatedTasks = alldisplayedTasks.slice(startIndex, startIndex + task_per_page);

    const handleAssigneeChange = (value) => {

        setSelectedAssigneeId(value);
        setCurrentPage(1);
    }

    const handleStatusChange = (value) => {

        setSelectedStatus(value);
        setCurrentPage(1);
    }

    return(
        <div className="flex items-center gap-4  ">
        <div className="flex items-center gap-2 ">

            <span className="text-sm font-medium">Filter by Assignee and Status:</span>
            <Select
            onValueChange={handleAssigneeChange}
            >
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                    <SelectContent>
                         {users?.map((user) => (
                            <SelectItem key={user._id} value={user._id}>
                                {user.name}
                            </SelectItem>
                            ))}
                    </SelectContent>
            </Select>
        </div>

        <div className="flex items-center gap-2">
          <Select onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {status_options.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {paginatedTasks.map((task) => (
                <TaskCard key={task._id} task={task} />
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

export default Tasks;