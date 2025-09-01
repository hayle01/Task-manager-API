import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react'

import { Button } from '@/components/ui/button'

const createTask = async (newTask) => {
    const response = await fetch('http://localhost:3000/api/tasks',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newTask)
    });
    if(!response.ok) throw new Error('Failed to create task');
    return response.json();
}
export const AddTasks = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tasks']})
        }
    })
    const [task, setTask] = useState('');
    const handleAdd = () => {
        mutation.mutate({
            title: task,
            status: 'pending'
        })
    }
  return (
    <>
    <input type="text" onChange={(e) => setTask(e.target.value)} />
    <button onClick={handleAdd}>Add Task</button>
    <Button variant='default' size='sm'>Add Task</Button>
    </>
  )
}
