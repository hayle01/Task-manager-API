import { useState } from 'react'
import { DashboardHeader } from '../../components/dashboard/DashboardHeader'
import { DashboardWelcome } from '../../components/dashboard/DashboardWelcome'
import { TaskForm } from '../../components/tasks/taskForm'

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
  return (
    <>
    {/* Header */}
    <DashboardHeader />
    {/* Main content */}
    <main>
    {/* Welcome section */}
    <DashboardWelcome
      showCreateForm={showCreateForm}
      onCreateTask= {handleonCreateTask}
    />
    {/* Tasks section */}
    </main>
    {/*  Tasks dailog Form*/}
    <TaskForm
     open={showCreateForm || !!editingTask}
     onOpenChange={handleCloseForm}
     />
    </>
  )
}
