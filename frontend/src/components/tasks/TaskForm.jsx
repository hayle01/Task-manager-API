import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import api from '../../lib/api/ApiClient'
import useAuthStore from "../../lib/Store/authStore";
const TASK_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];
export const TaskForm = ({ open = true, onOpenChange }) => {
    const { token } = useAuthStore();
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    status: "pending",
    dueDate: "",
  });
  const [validationError, setvalidationError] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleStatusChange = (value) => {
    setFormValues({
      ...formValues,
      status: value,
    });
  };

  const handleCancel = () => {
    setFormValues({
        title: '',
        description: '',
        status: 'pending',
        dueDate: ''
    })
    onOpenChange?.(false);
  }

  const createTaskMutation = useMutation({
    mutationFn: async (taskData) => {
        const response = await api.post('/tasks', taskData)
        return response.data;
    },
    onSuccess: (data) => {
        console.log('Task created successfuly: ', data)
    },
    onError: (error) => {
        console.error('Task creation error', error)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    setvalidationError(null)
    if(!formValues.title) {
        setvalidationError('Title is required.')
        return
    }
    const taskData = {
        title: formValues.title.trim(),
        description: formValues.description.trim(),
        status: formValues.status,
        dueDate: formValues.dueDate ? new Date(formValues.dueDate).toISOString : null
    }
    createTaskMutation.mutate(taskData);
    setvalidationError(null)
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Create New Task
          </DialogTitle>
          <DialogDescription>Fill in details below the form </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>
              Title<span className="text-destructive">*</span>
            </Label>
            <Input
              name="title"
              value={formValues.title}
              onChange={handleChange}
              placeholder="Enter task title"
            />
            {validationError && <span className="text-destructive text-sm">{validationError}</span>}
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              value={formValues.description}
              onChange={handleChange}
              placeholder="Enter task description"
            />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={formValues.status}
              onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {TASK_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* DueDate */}
          <div className="space-y-2">
            <Label>Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              name="dueDate"
              value={formValues.dueDate}
              onChange={handleChange}
            />
          </div>

          <DialogFooter className='flex justify-end space-x-2'>
            <Button type='button' variant={'outline'} onClick={handleCancel}>Cancel</Button>
            <Button type='submit'>Create Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
