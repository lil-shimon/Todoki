import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Prisma, Todo } from '@prisma/client'

export type API = {
  getTodos: () => Promise<Todo[]>
  createTodo: (data: Prisma.TodoCreateInput) => Promise<Todo>
}

// Custom APIs for renderer
const api: API = {
  getTodos: () => ipcRenderer.invoke('get-todo'),
  createTodo: (data) => ipcRenderer.invoke('create-todo', data)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
