import { API_ENDPOINT } from '../'

export const UseTaskAPI = () => ({
  createTask: async ({ name }) => {
    try {
      console.log({ name })
      const url = `${API_ENDPOINT}/api/tasks`
      const body = { name }
      const response = await fetch(url, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      if (response.status === 400 || response.status !== 201) {
        return {
          success: false,
          message: 'Tente novamente mais tarde.'
        }
      } else {
        const data = await response.json()
        return {
          task: data,
          success: true,
          message: 'Tarefa criada.'
        }
      }
    } catch (err) {
      return {
        success: false,
        message: 'Tente novamente mais tarde.'
      }
    }
  },
  updateTask: async (taskId, { name }) => {
    try {
      const url = `${API_ENDPOINT}/tasks/task/${taskId}`
      const body = { name }
      const response = await fetch(url, {
        method: 'patch',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      if (response.status !== 400 || response.status !== 204) {
        return {
          success: false,
          message: 'Tarefa não encontrada'
        }
      } else {
        return {
          success: true,
          message: 'Tarefa atualizada.'
        }
      }
    } catch (err) {
      return {
        success: false,
        message: 'Tente novamente mais tarde.'
      }
    }
  },
  getTaskById: async taskId => {
    try {
      const url = `${API_ENDPOINT}/api/tasks/${taskId}`
      const response = await fetch(url, {
        method: 'get',
        headers: {
          Accept: 'application/json'
        }
      })
      if (response.status === 404 || response.status !== 200) {
        return {
          success: false,
          message: 'Tarefa não encontrada.'
        }
      } else {
        const data = await response.json()
        return {
          task: data,
          success: true,
          message: 'Tarefa encontrada.'
        }
      }
    } catch (err) {
      return {
        success: false,
        message: 'Tente novamente mais tarde.'
      }
    }
  },
  getAllTasks: async () => {
    try {
      const url = `${API_ENDPOINT}/api/tasks`
      const response = await fetch(url, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      if (response.status !== 200) {
        return {
          success: false,
          message: 'Tente novamente mais tarde.'
        }
      } else {
        return {
          tasks: data,
          success: true,
          message: 'Tarefas encontradas.'
        }
      }
    } catch (err) {
      return {
        success: false,
        message: 'Tente novamente mais tarde.'
      }
    }
  },
  deleteTaskById: async taskId => {
    try {
      const url = `${API_ENDPOINT}/api/task/${taskId}`
      const response = await fetch(url, {
        method: 'delete',
        headers: {
          Accept: 'application/json'
        }
      })
      if (response.status === 404 || response.status !== 204) {
        return {
          success: false,
          message: 'Tarefa não encontrada.'
        }
      } else {
        return {
          success: true,
          message: 'Tarefa removida.'
        }
      }
    } catch (err) {
      return {
        success: false,
        message: 'Tente novamente mais tarde.'
      }
    }
  }
})