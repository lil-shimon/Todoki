import { PrismaClient, Todo, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export const getTodos = async (): Promise<Todo[]> => {
  return await prisma.todo.findMany()
}

export const createTodo = async (data: Prisma.TodoCreateInput): Promise<Todo> => {
  return await prisma.todo.create({
    data
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
