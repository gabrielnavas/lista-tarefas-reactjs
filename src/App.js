import { useRef, useState } from 'react'
import './App.css'

import { Card } from './components/Card'
import { Tasks } from './components/Tasks'
import { FormTask } from './components/FormTask'
import { InputTask } from './components/InputTask'
import { ButtonConfirmTask } from './components/ButtonConfirmTask'
import { MessageError } from './components/MessageError'

function App () {
  const [messageSuccess, setMessageSuccess] = useState('')
  const [tasks, setTasks] = useState(['bla', 'bla2'])

  const [task, setTask] = useState('')
  const [taskOldToUpdate, setTaskOldToUpdate] = useState('')

  const [isUpdating, setIsUpdating] = useState(false)

  const inputRef = useRef(null)

  const onClickButtonAddTasks = e => {
    const existsTask = (tasks.findIndex(t => t === task) >= 0)
    if (existsTask) {
      setMessageSuccess('task já existente')
    } else {
      setMessageSuccess('')
      setTasks([task, ...tasks])
      setTask('')
      inputRef.current.focus()
    }
  }

  const onClickButtonRemove = taskName => {
    setTasks(tasks.filter(t => t !== taskName))
  }

  const onClickButtonUpdate = taskName => {
    setIsUpdating(true)
    setTask(taskName)
    setTaskOldToUpdate(taskName)
  }

  const onClickButtonFinishUpdate = e => {
    const indexTask = tasks.findIndex(t => t === taskOldToUpdate)
    const newTasks = [...tasks]
    newTasks[indexTask] = task
    setTasks(newTasks)
    setIsUpdating(false)
    setTask('')
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
          task={task}
          setTask={setTask}
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

export default App
