import { Todo } from '@prisma/client'
import { FormEvent, useCallback, useEffect, useState } from 'react'

type TodoListPresenterReturnType = {
  title: string
  todos: Todo[]
  completedTodos: Todo[]
  handleCreateTodo: (e: FormEvent<HTMLFormElement>) => Promise<void>
  handleTitle: (value: string) => void
  handleDeleteTodo: (id: number) => Promise<void>
  handleCompleteTodo: (id: number) => Promise<void>
}

export const useTodoListPresenter = (): TodoListPresenterReturnType => {
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

  const handleCreateTodo = useCallback(
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

  const handleDeleteTodo = useCallback(
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

  const handleCompleteTodo = useCallback(
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

  const getCompletedTasksByDate = useCallback(async () => {
    const response = await window.api.getCompletedTasksByDate()
    console.log('response', response)
  }, [])

  useEffect(() => {
    getIncompleteTodos()
  }, [getIncompleteTodos])

  useEffect(() => {
    getCompleteTodos()
  }, [getCompleteTodos])

  useEffect(() => {
    getCompletedTasksByDate()
  }, [getCompletedTasksByDate])

  const handleTitle = useCallback((value: string) => {
    setTitle(value)
  }, [])

  return {
    title,
    todos,
    completedTodos,
    handleCreateTodo,
    handleTitle,
    handleDeleteTodo,
    handleCompleteTodo
  }
}
