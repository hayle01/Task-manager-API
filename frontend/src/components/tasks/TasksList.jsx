import { useState } from "react";
import { ClipboardCheck, Search } from "lucide-react";
import { Input } from '@/components/ui/input' 
export const TasksList = ({
  tasks = [],
  isLoading = false,
  onEditTask,
  onDeleteTask,
  onStatusChange,
}) => {
  const [ searchTerm, setSearchTerm ] = useState(null);

  const getTaskStats = () => {
    const total = tasks.length;
    const pending = tasks.filter(task => task.status === 'pending').length;
    const inProgress = tasks.filter(task => task.status === 'in-progress').length;
    const completed = tasks.filter(task => task.status === 'completed').length;

    return { total, pending, inProgress,completed}
  } 
  const { total, pending, inProgress, completed} = getTaskStats();
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
          <p className="text-2xl  font-bold">{total}</p>
        </div>

        {/* Total Pending tasks */}
        <div className="bg-card p-4 space-y-2 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Pending</p>
            <div className="h-2 w-2 rounded-full bg-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-yellow-600">{pending}</p>
        </div>

         {/* Total In-progress tasks */}
        <div className="bg-card p-4 space-y-2 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">In Progress</p>
            <div className="h-2 w-2 rounded-full bg-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-600">{inProgress}</p>
        </div>

       {/* Total Completed tasks */}
        <div className="bg-card p-4 space-y-2 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Completed</p>
            <div className="h-2 w-2 rounded-full bg-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-600">{completed}</p>
        </div>
      </div>

      {/* Search bar tasks */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type= 'text'
              placeholder= 'Search tasks...'
              value={searchTerm}
              onChange={() => setSearchTerm(e.target.value)}
              className='pl-10'
           />
        </div>
      </div>
    </div>
  );
};
