import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDeleteTaskMutation,useUpdateTaskMutation,useGetAllUsersQuery } from "@/lib/api";
import { Select,SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Trash2 } from "lucide-react";


const status_options = ["To Do", "In Progress", "Done"];

export default function TaskCard({ task, showDelete = false , user}) {

  console.log("user id eka thama:", {userid:user?._id});
  const { name, description, status, creator, assignees } = task ?? {};
  const assigneeList = Array.isArray(assignees) ? assignees : [];

  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const {data:users} = useGetAllUsersQuery();

  const isAssignee = assigneeList.some(
    (assignee) =>(assignee?._id?.toString() ?? assignee?.toString()) === user?.id?.toString()
);

console.log("isAssignee check:", {
    userId: user?.id,
    assigneeList: assigneeList.map(a => a?._id?.toString() ?? a?.toString()),
    isAssignee
});

  const handleDelete = async () => {
    await deleteTask(task._id);  
};
const handleStatusChange = async (newStatus) => {
    await updateTask({ id: task._id, status: newStatus });
  };

  const getStatusColor = (status) => {
    switch (status) {
        case "To Do": return "bg-red-100 text-red-600";
        case "In Progress": return "bg-yellow-100 text-yellow-600";
        case "Done": return "bg-green-100 text-green-600";
        default: return "bg-primary/10 text-primary";
    }
};

  return (
    <Card className="overflow-hidden shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <CardHeader className="border-b border-border/70 px-6 py-5">
        <div>
          <CardTitle>{name || "Untitled task"}</CardTitle>
          <CardDescription>{description || "No task description available."}</CardDescription>
        </div>
        <span className={`inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${getStatusColor(status)}`}>
          {status || "To Do"}
        </span>
      </CardHeader>

      <CardContent className="space-y-4 px-6 py-5">
        <div className="space-y-4 text-sm text-muted-foreground">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Creator</p>
            <p className="mt-1 text-sm text-foreground">
              {creator?.name || creator || "creator unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Assignees</p>
            {assigneeList.length > 0 ? (
              <ul className="mt-1 space-y-1 text-sm text-foreground">
                {assigneeList.map((assignee, index) => (
                  <li key={index}>{assignee?.name || assignee || `Assignee ${index + 1}`}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-sm text-foreground">None assigned</p>
            )}
          </div>
          {isAssignee && (
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
                Update Status
              </p>
              <Select
                defaultValue={status}
                onValueChange={handleStatusChange}
                disabled={isUpdating}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {status_options.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

        </div>
      </CardContent>

      
        {showDelete && (
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
      
    </Card>
  );
}
