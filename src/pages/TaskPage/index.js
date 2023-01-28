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

  const [messageSuccess, setMessageSuccess] = useState('')
  const [tasks, setTasks] = useState([])

  const [taskName, setTaskName] = useState('')
  const [taskOldToUpdate, setTaskOldToUpdate] = useState('')

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
      setMessageSuccess('Tarefa já existente.')
    } else if (!taskName) {
      setMessageSuccess('Tarefa está vazia.')
    } else {
      const result = await taskAPI.createTask({
        name: taskName
      })
      if (result.success) {
        setMessageSuccess('')
        setTaskName('')
        inputRef.current.focus()
        const newTask = result.task
        setTasks([newTask, ...tasks])
      } else {
        setMessageSuccess('Tente novamente mais tarde.')
        throw new Error(result.message)
      }
    }
  }

  const onClickButtonRemove = taskId => {
    setTasks(tasks.filter(t => t.id !== taskId))
  }

  const onClickButtonUpdate = taskName => {
    setIsUpdating(true)
    setTaskName(taskName)
    setTaskOldToUpdate(taskName)
  }

  const onClickButtonFinishUpdate = e => {
    const indexTask = tasks.findIndex(t => t === taskOldToUpdate)
    const newTasks = [...tasks]
    newTasks[indexTask] = taskName
    setTasks(newTasks)
    setIsUpdating(false)
    setTaskName('')
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
        <MessageError message={messageSuccess} />
      </FormTask>
    </Card>
  )
}

export default TaskPage
