import { Box, Button, Flex } from '@chakra-ui/react'
import { Checkbox } from '../../../../components/ui/checkbox'
import { ReactNode } from 'react'
import { Todo } from '@prisma/client'

type Props = {
  todo: Todo
  onCompleteTodo?: (id: number) => Promise<void>
  onDeleteTodo?: (id: number) => Promise<void>
}

export const TodoListItem = ({ todo, onCompleteTodo, onDeleteTodo }: Props): ReactNode => {
  return (
    <Flex width="100%" key={todo.id}>
      <Checkbox width="100%" onClick={() => onCompleteTodo?.(todo.id)} checked={todo.completed}>
        <Box width="100%" p="2">
          {todo.title}
        </Box>
      </Checkbox>
      <Button type="button" onClick={() => onDeleteTodo?.(todo.id)}>
        削除
      </Button>
    </Flex>
  )
}
