  import { useQuery } from "@tanstack/react-query"

  function App() {
    const { data, isLoading, error} = useQuery({
      queryKey: ['users'],
      queryFn: () => fetch('http://localhost:3000/api/users').then(res => res.json())
    })

    if(isLoading) return <h1>Loading....</h1>

    if(error) return <h1>Error....</h1>

    return (
      <>
        {data?.map((user, index) => <h1 key={index}>{user.name}</h1>)}
      </>
    )
  }

  export default App
