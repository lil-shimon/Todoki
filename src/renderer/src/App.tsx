import { Box, Button, Flex, Input, Stack } from '@chakra-ui/react'
import { Checkbox } from '../../components/ui/checkbox'
import { Todo } from '@prisma/client'
import { useCallback, useEffect, useState } from 'react'

function App(): JSX.Element {
  const [title, setTitle] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const getCompleteTodos = useCallback(async (): Promise<void> => {
    const todos = await window.api.getCompleteTodos()
    setCompletedTodos(todos)
  }, [])

  const getIncompleteTodos = useCallback(async (): Promise<void> => {
    const todos = await window.api.getIncompleteTodos()
    setTodos(todos)
  }, [])

  const createTodo = useCallback(
    async (e): Promise<void> => {
      e.preventDefault()
      const todo = await window.api.createTodo({
        title
      })
      setTodos([...todos, todo])
      setTitle('')
    },
    [title, todos]
  )

  const deleteTodo = useCallback(
    async (id: number): Promise<void> => {
      const response = await window.api.deleteTodo(id)
      if (!response) {
        window.alert('TODOの削除に失敗しました')
        return
      }
      const newTodos = todos.filter((todo) => todo.id !== id)
      setTodos(newTodos)
    },
    [todos]
  )

  const completeTodo = useCallback(
    async (id: number) => {
      const response = await window.api.completeTodo(id)
      if (!response) {
        window.alert('TODOの完了に失敗しました')
        return
      }
      await getIncompleteTodos()
    },
    [getIncompleteTodos]
  )

  useEffect(() => {
    getIncompleteTodos()
  }, [getIncompleteTodos])

  useEffect(() => {
    getCompleteTodos()
  }, [getCompleteTodos])

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
            <Checkbox width="100%" onClick={() => completeTodo(todo.id)} checked={todo.completed}>
              <Box width="100%" p="2">
                {todo.title}
              </Box>
            </Checkbox>
            <Button type="button" onClick={() => deleteTodo(todo.id)}>
              削除
            </Button>
          </Flex>
        ))}
      </Flex>
      <div>
        {completedTodos.map((todo) => (
          <Flex width="100%" key={todo.id}>
            <Box width="100%" p="2">
              {todo.title}
            </Box>
          </Flex>
        ))}
      </div>
    </Flex>
  )
}

export default App
