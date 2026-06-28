import {z} from 'zod';

 const CreateTaskDTO = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    status: z.enum(['To Do', 'In Progress', 'Done']).default('To Do'),
    creator: z.string().min(1, { message: "Creator is required" }),
    assignees: z.array(z.string()).optional()
});

export default CreateTaskDTO;