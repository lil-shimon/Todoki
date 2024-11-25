import { Box, Button, Flex, Input, Stack } from '@chakra-ui/react'
import { Checkbox } from '../../../../components/ui/checkbox'
import { ReactNode } from 'react'
import { useTodoListPresenter } from './todo-list.presenter'

export const TodoList = (): ReactNode => {
  const {
    title,
    todos,
    completedTodos,
    handleTitle,
    handleCompleteTodo,
    handleCreateTodo,
    handleDeleteTodo
  } = useTodoListPresenter()

  return (
    <Flex gap="16" direction="column">
      <form onSubmit={handleCreateTodo}>
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
            <Checkbox
              width="100%"
              onClick={() => handleCompleteTodo(todo.id)}
              checked={todo.completed}
            >
              <Box width="100%" p="2">
                {todo.title}
              </Box>
            </Checkbox>
            <Button type="button" onClick={() => handleDeleteTodo(todo.id)}>
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
