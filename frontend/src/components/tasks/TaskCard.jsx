import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  Edit2,
  Loader2,
  MoreVertical,
  Trash2
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from '../../lib/api/ApiClient';
const STATUS_CONFIG = {
  pending: {
    variant: "secondary",
    label: "Pending",
    color: "text-yellow-600",
  },
  "in-progress": {
    variant: "",
    label: "In Progress",
    color: "text-primary-foreground",
  },
  completed: {
    variant: "outline",
    label: "completed",
    color: "text-green-600",
  },
};
export const TaskCard = ({
  task,
  onEditTask,
  onStatusChange,
  isLoading = false,
}) => {

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const statusConfig = STATUS_CONFIG[task.status] || STATUS_CONFIG["pending"];

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const isOverDue = (dueDate) => {
    if (!dueDate || task.status === "completed") return false;
    return new Date(dueDate) < new Date();
  };
  // dueDate formaT
  const dueDate = formatDate(task.dueDate);
  const overDue = isOverDue(task.dueDate);

  const queryClient = useQueryClient();
  // TODO: Mutation to delete Task
  const deleteTaskMutation = useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/tasks/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Task deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ['tasks']});
    },
    onError: (error) => {
      toast.error("Failed to delete the task. Please try again.");
      console.error("Error deleting task:", error);
    }
  })
  const handleConfirmDelete = () => {
    try {
      deleteTaskMutation.mutateAsync(task._id)
      setShowDeleteDialog(false);
    } catch (error) {
      toast.error("Failed to delete the task. Please try again.");
      console.error("Error deleting task:", error);
    }
  }


  return (
    <>
      <Card className="w-full transition-shadow hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg leading-tight">
              {task.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge
                variant={statusConfig.variant}
                className={`text-sm shrink-0  ${statusConfig.color}`}>
                {statusConfig.label}
              </Badge>
              {/* DropMenu for actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 cursor-pointer">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEditTask(task)}>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* task description */}
          {task.description && (
            <p className="text-muted-foreground text-sm leading-relaxed">
              {task.description}
            </p>
          )}

          {/* task dueDate */}
          {dueDate && (
            <div className="flex items-center gap-2">
              <Calendar className="text-muted-foreground w-4 h-4" />
              <span className="text-muted-foreground text-sm">Due:</span>
              <Badge
                variant={`${overDue ? 'destructive' : 'outline'}`}
                className={`text-xs ${
                  overDue ? "text-destructive/80" : "text-muted-foreground"
                }`}>
                {dueDate} {overDue && "(Overdue)"}
              </Badge>
            </div>
          )}

          {/* Simple status indicator */}
          <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
            <span >Created: <Badge
                variant='outline'
                className="text-muted-foreground"
                >
                {formatDate(task.createdAt)}
              </Badge>  </span>
            <span className={`${statusConfig.color === 'text-primary-foreground' ? 'text-primary' : statusConfig.color}`}>{statusConfig.label}</span>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the task <span className="font-medium">"{task.title}"</span>.
                </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700 focus:ring-red-600" disabled={deleteTaskMutation.isLoading}>
                  {deleteTaskMutation.isLoading ? (<span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> 'Deleting...'</span>) : 'Delete'}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
