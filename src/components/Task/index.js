import { useState } from 'react'
import './index.css'

export const Task = ({ task, onClickRemove, onClickUpdate }) => {
  const [isDelete, setIsDelete] = useState(false)

  const handleOnClickRemove = e => {
    if (!isDelete) {
      handleOnClickRemoveQuestion()
    } else {
      handleOnClickRemoveFinish()
    }
  }

  const handleOnClickCancelDelete = () => {
    setIsDelete(false)
  }

  const handleOnClickRemoveQuestion = () => {
    setIsDelete(true)
  }

  const handleOnClickRemoveFinish = () => {
    setIsDelete(false)
    onClickRemove(task.id)
  }

  return (
    <li className='container__task'>
      {task.name}
      <span>
        <button
          onClick={handleOnClickRemove}>
            {
              isDelete ? 'Confirmar' : 'Deletar'
            }
        </button>
        {
          isDelete && (
            <button
              onClick={handleOnClickCancelDelete}>
              Cancelar
            </button>
          )
        }
        <button
          onClick={() => onClickUpdate(task)}>
            Atualizar
        </button>
      </span>
    </li>
  )
}
