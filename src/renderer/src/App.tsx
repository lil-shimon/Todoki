import { Box, Button, Flex, Input, Stack } from '@chakra-ui/react'
import { Todo } from '@prisma/client'
import { useCallback, useEffect, useState } from 'react'

function App(): JSX.Element {
  const [title, setTitle] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])

  const getTodo = useCallback(async (): Promise<void> => {
    const todos = await window.api.getTodos()
    setTodos(todos)
  }, [setTodos])

  const createTodo = async (e): Promise<void> => {
    e.preventDefault()
    const todo = await window.api.createTodo({
      title
    })
    setTodos([...todos, todo])
    setTitle('')
  }

  const deleteTodo = async (id: number): Promise<void> => {
    const response = await window.api.deleteTodo(id)
    if (!response) {
      window.alert('TODOの削除に失敗しました')
      return
    }
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  useEffect(() => {
    getTodo()
  }, [getTodo])

  const handleTitle = useCallback((value: string) => {
    setTitle(value)
  }, [])

  return (
    <Flex gap="16" direction="column">
      <form onSubmit={createTodo}>
        <Stack direction="row">
          <Input
            placeholder="Todoを入力"
            id="todo title"
            aria-label="todo title"
            onChange={(e) => handleTitle(e.target.value)}
            value={title}
          />
          <Button type="submit">add</Button>
        </Stack>
      </form>
      <Flex gap="4" align="center" direction="column" width="100%">
        {todos.map((todo) => (
          <Flex width="100%" key={todo.id}>
            <Box width="100%" p="2">
              {todo.title}
            </Box>
            <Button type="button" onClick={() => deleteTodo(todo.id)}>
              削除
            </Button>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

export default App
