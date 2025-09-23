import { useState } from 'react'
import { DashboardHeader } from '../../components/dashboard/DashboardHeader'
import { DashboardWelcome } from '../../components/dashboard/DashboardWelcome'
import { TaskForm } from '../../components/tasks/taskForm'
import { TasksList } from '../../components/tasks/TasksList'
import { useQuery } from '@tanstack/react-query'
import api from '../../lib/api/ApiClient'
import { Loader } from 'lucide-react'

export const DashboardPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const handleCloseForm = () => {
    setShowCreateForm(false)
    setEditingTask(null)
  }

  const handleonCreateTask = () => {
    setShowCreateForm(true)
  }
  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await api.get('/tasks');
      return response.data
    },
    onError: (error) => {
      console.error('Error fetching tasks', error)
    },
    retry: 1
  })

  const handleEditTask = (task) => {
    setEditingTask(task)
    setShowCreateForm(true)
  }

  const handleStatusChange = (taskId, statusData) => {
    // TODO: MUTATION to update task status
  }

  if(tasksQuery.isLoading){
    return(
      <div className='flex h-screen items-center justify-center'>
        <Loader className='animate-spin'/>
      </div>
    )
  }

  return (
    <>
    {/* Header */}
    <DashboardHeader />
    {/* Main content */}
    <main className='max-w-7xl mx-auto px-4 py-8 space-y-6'>
    {/* Welcome section */}
    <DashboardWelcome
      onCreateTask= {handleonCreateTask}
    />
    {/* Tasks section */}
    <TasksList 
      tasks={tasksQuery.data || []}
      isLoading={tasksQuery.isLoading}
      onEditTask={handleEditTask}
      onStatusChange = {handleStatusChange}
    />
    </main>
    {/*  Tasks dailog Form*/}
    <TaskForm
    task={editingTask}
     open={showCreateForm || !!editingTask}
     onOpenChange={handleCloseForm}
     />
    </>
  )
}
