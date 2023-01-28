import './index.css'

export const Task = ({ task, onClickRemove, onClickUpdate }) => {
  return (
    <li className='container__task'>
      {task.name}
      <span>
        <button
          onClick={() => onClickRemove(task.id)}>
            Deletar
        </button>
        <button
          onClick={() => onClickUpdate(task)}>
            Atualizar
        </button>
      </span>
    </li>
  )
}
