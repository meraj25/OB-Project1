import { Button } from "./ui/button"
import { useState,useEffect } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Field, FieldGroup } from "./ui/field"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor, } from "./ui/combobox"
import { useGetAllUsersQuery, useCreateTaskMutation } from "@/lib/api"


function CreateTask({user}){

    const {data: users = [] , isLoading} = useGetAllUsersQuery();
    const [createTask] = useCreateTaskMutation();

    const [form, setForm] = useState({
        name: "",
        description: "",
        status: "To Do",
        assignees: [],
    })
    useEffect(() => {
         console.log("user:", user)
    if (user?.id) {
        setForm((prev) => ({ ...prev, creator: user.id }))
    }
}, [user])

    const [errors, setErrors] = useState({
        name: "",
        description: "",
        status: "",
        assignees: [],
    })
    const [success , setSuccess] = useState(false)
    const [open, setOpen] = useState(false)
    const anchorRef = useComboboxAnchor()

    console.log("user prop keys:", JSON.stringify(user))

    const validateTask = () => {
        const nextErrors = {
            name: "",
            description: "",
            status: "",
            assignees: "",
        }
        if (!form.name) {
            nextErrors.name = "Task name is required."
        }
        if (!form.description) {
            nextErrors.description = "Description is required."
        }
        if (!form.assignees || form.assignees.length === 0) {
            nextErrors.assignees = "Please assign at least one person."
        }
        setErrors(nextErrors)
        return !nextErrors.name && !nextErrors.description && !nextErrors.assignees
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    const handleAssigneesChange = (value) => {
        setForm((prev) => ({ ...prev, assignees: value || [] }));
        setErrors((prev) => ({ ...prev, assignees: "" }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
         console.log("form state:", form)

        if (!validateTask()){
             console.log("validation failed:", errors)
             return;
        } 

        try {
            const taskPayload = {
                name: form.name,
                description: form.description,
                status: form.status,
                creator: user?.id,
                assignees: (Array.isArray(form.assignees) ? form.assignees : [form.assignees])
                    .filter(Boolean)
                    .map((assignee) => (typeof assignee === "string" ? assignee : assignee?._id ?? assignee)),
            };

            console.log(taskPayload)

            await createTask(taskPayload);
            setSuccess(true);
            if(success){
                console.log("task created")
            }
            setForm({
                name: "",
                description: "",
                status: "To Do",
                creator: user ?? "",
                assignees: [],})

        } catch (error) {
            console.error("Failed to create task:", error);
        }
    }

    return(
        <Dialog open={open} onOpenChange={setOpen} modal ={false}>
            <DialogTrigger asChild>
                <Button>+ Create Task</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-140 ">
                <DialogHeader>
                    <DialogTitle>Create a new task</DialogTitle>
                    <DialogDescription>
                        Fill in the details below and assign one or more people to the task.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name">Task name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter task name"
                            />
                            {errors.name ? <p className="text-sm text-red-500">{errors.name}</p> : null}
                        </Field>

                        <Field>
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                value={form.description}
                                onChange={handleChange}
                                className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                                placeholder="Describe the task"
                            />
                            {errors.description ? <p className="text-sm text-red-500">{errors.description}</p> : null}
                        </Field>

                        <Field>
                            <Label htmlFor="status">Status</Label>
                            <select
                                id="status"
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                            >
                                <option value="To Do">To Do</option>
                                
                            </select>
                        </Field>

                        <Field>
                            <Label>Assignees</Label>
                            <div ref={anchorRef} className="w-full">
                                <Combobox
                                    items={users.map((userItem) => ({ label: userItem.name || userItem.username || userItem.email, value: userItem._id })) || []}
                                    multiple    
                                    value={form.assignees}
                                    onValueChange={handleAssigneesChange}
                                >
                                    <ComboboxChips>
                                        <ComboboxValue>
                                            {form.assignees.map((id) => {
                                                const selectedUser = users.find((userItem) => userItem._id === id);
                                                return (<ComboboxChip key={id}>{selectedUser?.name || selectedUser?.username || selectedUser?.email || id}</ComboboxChip>);
                                            })}
                                        </ComboboxValue>
                                        <ComboboxChipsInput placeholder="Select assignees" />
                                    </ComboboxChips>
                                    <ComboboxContent anchor={anchorRef.current}>
                                        <ComboboxEmpty>No users found.</ComboboxEmpty>
                                        <ComboboxList>
                                            {(item) => (
                                                <ComboboxItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>
                            {errors.assignees ? <p className="mt-1 text-sm text-red-500">{errors.assignees}</p> : null}
                        </Field>
                    </FieldGroup>

                    {success ? <p className="text-sm text-green-600">Task created successfully.</p> : null}

                    <div className="flex items-center justify-between pt-2">
                        <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Creating" : "create"}
                         </Button>
               
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
   
}


export default CreateTask;