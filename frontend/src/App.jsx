  import { useQuery } from "@tanstack/react-query"
import { AddTasks } from "./AddTasks"

  function App() {
    const { data, isLoading, error} = useQuery({
      queryKey: ['tasks'],
      queryFn: () => fetch('http://localhost:3000/api/tasks/my-tasks').then(res => res.json())
    })

    if(isLoading) return <h1>Loading....</h1>

    if(error) return <h1>Error....</h1>

    return (
      <>
        <AddTasks />
        {data?.map((task, index) => <h1 key={index}>{task.title}</h1>)}
      </>
    )
  }

  export default App
