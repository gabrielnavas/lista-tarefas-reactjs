import { useEffect, useRef, useState } from 'react'
import './index.css'

import { Card } from '../../components/Card'
import { Tasks } from '../../components/Tasks'
import { FormTask } from '../../components/FormTask'
import { InputTask } from '../../components/InputTask'
import { ButtonConfirmTask } from '../../components/ButtonConfirmTask'
import { MessageError } from '../../components/MessageError'
import { UseTaskAPI } from '../../api/task'

export const TaskPage = () => {
  const taskAPI = UseTaskAPI()

  const [messageError, setMessageError] = useState('')
  const [tasks, setTasks] = useState([])

  const [taskName, setTaskName] = useState('')
  const [taskOldToUpdate, setTaskOldToUpdate] = useState({})

  const [isUpdating, setIsUpdating] = useState(false)

  const inputRef = useRef(null)

  useEffect(() => {
    (async () => {
      const result = await taskAPI.getAllTasks()
      setTasks(result.tasks)
    })()
  }, [])

  const onClickButtonAddTasks = async e => {
    const existsTask = (tasks.findIndex(t => t.name === taskName) >= 0)
    if (existsTask) {
      setMessageError('Tarefa já existente.')
    } else if (!taskName) {
      setMessageError('Tarefa está vazia.')
    } else {
      const result = await taskAPI.createTask({
        name: taskName
      })
      if (result.success) {
        setMessageError('')
        setTaskName('')
        inputRef.current.focus()
        const newTask = result.task
        setTasks([newTask, ...tasks])
      } else {
        setMessageError('Tente novamente mais tarde.')
        throw new Error(result.message)
      }
    }
  }

  const onClickButtonRemove = taskId => {
    setTasks(tasks.filter(t => t.id !== taskId))
  }

  const onClickButtonUpdate = task => {
    setIsUpdating(true)
    setTaskName(task.name)
    setTaskOldToUpdate(task)
  }

  const onClickButtonFinishUpdate = async e => {
    const resultGet = await taskAPI.getTaskByName(taskOldToUpdate.name)
    if (resultGet.success && taskOldToUpdate.id !== resultGet.task.id) {
      setMessageError('Tarefa já existe com esse nome.')
    } else {
      const resultUpdate = await taskAPI.updateTask(taskOldToUpdate.id, { name: taskName })
      if (resultUpdate.success) {
        const taskIndex = tasks.findIndex(t => t.id === taskOldToUpdate.id)
        const newTasks = [...tasks]
        newTasks[taskIndex].name = taskName
        setTasks(newTasks)
        setIsUpdating(false)
        setTaskName('')
      } else {
        setMessageError(resultUpdate.message)
        throw new Error(resultUpdate.message)
      }
    }
  }

  return (
    <Card>
      <Tasks
        tasks={tasks}
        onClickButtonRemove={onClickButtonRemove}
        onClickButtonUpdate={onClickButtonUpdate}
      />
      <FormTask>
        <InputTask
          taskName={taskName}
          setTaskName={setTaskName}
          inputRef={inputRef}
        />
        <ButtonConfirmTask
          isUpdating={isUpdating}
          onClickButtonAddTasks={onClickButtonAddTasks}
          onClickButtonFinishUpdate={onClickButtonFinishUpdate}
        />
        <MessageError message={messageError} />
      </FormTask>
    </Card>
  )
}

export default TaskPage
