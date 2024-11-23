import { PrismaClient, Todo, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

// TODO: delete
export const getTodos = async (): Promise<Todo[]> => {
  return await prisma.todo.findMany()
}

export const getCompleteTodos = async (): Promise<Todo[]> => {
  return await prisma.todo.findMany({
    where: {
      completed: true
    }
  })
}

export const getIncompleteTodos = async (): Promise<Todo[]> => {
  return await prisma.todo.findMany({
    where: {
      completed: false
    }
  })
}

export const createTodo = async (data: Prisma.TodoCreateInput): Promise<Todo> => {
  return await prisma.todo.create({
    data
  })
}

export const completeTodo = async (id: number): Promise<Todo> => {
  const now = new Date()
  return await prisma.todo.update({
    where: {
      id
    },
    data: {
      completed: true,
      completedAt: now,
      completedYear: now.getFullYear(),
      completedMonth: now.getMonth() + 1,
      completedDay: now.getDate()
    }
  })
}

export const deleteTodo = async (id: number): Promise<boolean> => {
  try {
    await prisma.todo.delete({
      where: {
        id
      }
    })
    return true
  } catch {
    return false
  }
}

export const getCompletedTasksByDate = async (): Promise<Prisma.TodoGroupByArgs> => {
  return await prisma.todo.groupBy({
    by: ['completedYear', 'completedMonth', 'completedDay'],
    where: {
      completed: true
    },
    _count: {
      _all: true
    },
    orderBy: [{ completedYear: 'desc' }, { completedMonth: 'desc' }, { completedDay: 'desc' }]
  })
}
