import { Button } from '@chakra-ui/react'

function App(): JSX.Element {
  const getTodo = async (): Promise<void> => {
    const todos = await window.api.getTodos()
    console.log(todos)
  }

  const createTodo = async (): Promise<void> => {
    const todo = await window.api.createTodo({
      title: 'Hello, World!'
    })
    console.log(todo)
  }

  return (
    <>
      <Button onClick={getTodo}>Fetch</Button>
      <Button onClick={createTodo}>Create</Button>
    </>
  )
}

export default App
