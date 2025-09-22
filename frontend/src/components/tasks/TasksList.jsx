import { useState } from "react";
import { ClipboardCheck, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TaskCard } from "./TaskCard";

export const TasksList = ({
  tasks = [],
  isLoading = false,
  onEditTask,
  onDeleteTask,
  onStatusChange,
}) => {
  const TaskGrid = ({ tasks, emptyMessage }) => {
    if (tasks.length === 0) {
      return (
        <div className="flex text-center py-12">
          <div className="flex flex-col items-center justify-center mx-auto max-w-md">
            <ClipboardCheck className="max-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-sm font-medium text-foreground">
              No tasks found
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{emptyMessage}</p>
          </div>
        </div>
      );
    }
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
            onStatusChange={onStatusChange}
            isLoading={isLoading}
          />
        ))
        }
      </div>
    );
  };
  const [searchTerm, setSearchTerm] = useState("");

  const getTaskStats = () => {
    const getTasksByStatus = {
      total: tasks.length,
      pending: tasks.filter((task) => task.status === "pending").length,
      inProgress: tasks.filter((task) => task.status === "in-progress").length,
      completed: tasks.filter((task) => task.status === "completed").length,
    };

    const categorizedTasks = {
      all: tasks,
      pending: tasks.filter((task) => task.status === "pending"),
      inProgress: tasks.filter((task) => task.status === "in-progress"),
      completed: tasks.filter((task) => task.status === "completed")
    };

    const Stats = {
      total: getTasksByStatus.total,
      pending: getTasksByStatus.pending,
      inProgress: getTasksByStatus.inProgress,
      completed: getTasksByStatus.completed
    }

    return { Stats, categorizedTasks };
  };
  const { Stats, categorizedTasks } = getTaskStats();
  return (
    <div className="space-y-4">
      {/* Stats overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total tasks  */}
        <div className="bg-card p-4 space-y-2 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Total</p>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-2xl  font-bold">{Stats.total}</p>
        </div>

        {/* Total Pending tasks */}
        <div className="bg-card p-4 space-y-2 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Pending</p>
            <div className="h-2 w-2 rounded-full bg-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-yellow-600">{Stats.pending}</p>
        </div>

        {/* Total In-progress tasks */}
        <div className="bg-card p-4 space-y-2 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              In Progress
            </p>
            <div className="h-2 w-2 rounded-full bg-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-600">{Stats.inProgress}</p>
        </div>

        {/* Total Completed tasks */}
        <div className="bg-card p-4 space-y-2 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Completed
            </p>
            <div className="h-2 w-2 rounded-full bg-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-600">{Stats.completed}</p>
        </div>
      </div>

      {/* Search bar tasks */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={() => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger
            value="all"
            className="flex items-center gap-2 cursor-pointer">
            All{" "}
            <Badge variant="secondary" className="rounded-md">
              {Stats.total}
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="flex items-center gap-2 cursor-pointer">
            Pending{" "}
            <Badge variant="secondary" className="rounded-md">
              {Stats.pending}
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="in-progress"
            className="flex items-center gap-2 cursor-pointer">
            In Progress{" "}
            <Badge variant="secondary" className="rounded-md">
              {Stats.inProgress}
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="flex items-center gap-2 cursor-pointer">
            Completed{" "}
            <Badge variant="secondary" className="rounded-md">
              {Stats.completed}
            </Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" >    
            <TaskGrid tasks={categorizedTasks.all} emptyMessage={'No tasks found'} />
        </TabsContent>
        <TabsContent value="pending" >
          <TaskGrid tasks={categorizedTasks.pending} emptyMessage={'No Pending tasks found'} />
        </TabsContent>
        <TabsContent value="in-progress">
          <TaskGrid tasks={categorizedTasks.inProgress} emptyMessage={'No In-progress tasks found'} />
        </TabsContent>
        <TabsContent value="completed">
          <TaskGrid tasks={categorizedTasks.completed} emptyMessage={'No completed tasks found'} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
