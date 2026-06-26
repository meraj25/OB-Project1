import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TaskCard({ task }) {
  const { name, description, status, creator, assignees } = task ?? {};
  const assigneeList = Array.isArray(assignees) ? assignees : [];

  return (
    <Card className="overflow-hidden shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <CardHeader className="border-b border-border/70 px-6 py-5">
        <div>
          <CardTitle>{name || "Untitled task"}</CardTitle>
          <CardDescription>{description || "No task description available."}</CardDescription>
        </div>
        <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
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
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap items-center justify-between gap-3 px-6 py-5">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Task details</span>
        <Button variant="outline" size="sm">View task</Button>
      </CardFooter>
    </Card>
  );
}
