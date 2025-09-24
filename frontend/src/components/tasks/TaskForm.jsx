import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api/ApiClient";
import { toast } from "sonner";
import { extractErrorMessages } from "../../util/errorUtils";
import { Loader } from "lucide-react";

const TASK_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

// Helper to initialize form values
const getInitialFormValues = (task) => ({
  title: task?.title || "",
  description: task?.description || "",
  status: task?.status || "pending",
  dueDate: task?.dueDate
    ? new Date(task.dueDate).toISOString().split("T")[0]
    : "",
});

export const TaskForm = ({ task = null, open = false, onOpenChange }) => {
  const [formValues, setFormValues] = useState(getInitialFormValues(task));
  const [validationError, setValidationError] = useState(null);
  const queryClient = useQueryClient();

  // Reset form whenever task or dialog opens
  useEffect(() => {
    setFormValues(getInitialFormValues(task));
    setValidationError(null);
  }, [task, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value) => {
    setFormValues((prev) => ({ ...prev, status: value }));
  };

  const handleCancel = () => {
    setFormValues(getInitialFormValues(null));
    onOpenChange?.(false);
  };

  const createTaskMutation = useMutation({
    mutationFn: async (taskData) => {
      const response = await api.post('/tasks', taskData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      toast.success("Task created successfully.");
      onOpenChange?.(false);
      setFormValues(getInitialFormValues(null));
    },
    onError: (error) => {
      const msg = extractErrorMessages(error);
      setValidationError(msg);
      toast.error(`Error creating task: ${msg}`, { description: "Please try again." });
    }
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ taskId, taskData }) => {
      const response = await api.put(`/tasks/${taskId}`, taskData);
      return response.data;
    },
      onSuccess: () => {
        queryClient.invalidateQueries(["tasks"]);
        toast.success("Task updated successfully.");
        onOpenChange?.(false);
      },
      onError: (error) => {
        const msg = extractErrorMessages(error);
        setValidationError(msg);
        toast.error(`Error updating task: ${msg}`, { description: "Please try again." });
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError(null);

    if (!formValues.title.trim()) {
      setValidationError("Title is required.");
      return;
    }

    const taskData = {
      title: formValues.title.trim(),
      description: formValues.description.trim(),
      status: formValues.status,
      dueDate: formValues.dueDate ? new Date(formValues.dueDate).toISOString() : null,
    };

    if (task?._id) {
      updateTaskMutation.mutate({ taskId: task._id, taskData });
    } else {
      createTaskMutation.mutate(taskData);
    }
  };

  const isLoading = createTaskMutation.isLoading || updateTaskMutation.isLoading;

  const displayError = validationError;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {task ? "Edit Task" : "Create New Task"}
          </DialogTitle>
          <DialogDescription>Fill in details below the form</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {displayError && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
              {displayError}
            </div>
          )}

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
            <Select value={formValues.status} onValueChange={handleStatusChange}>
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

          <DialogFooter className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader size="sm" className="animate-spin" />
                  {task ? "Updating..." : "Creating..."}
                </span>
              ) : task ? (
                "Update Task"
              ) : (
                "Create Task"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
