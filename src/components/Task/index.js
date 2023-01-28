import PropTypes from 'prop-types'

import './index.css'

export const Task = ({ name, onClickRemove, onClickUpdate }) => {
  return (
    <li className='container__task'>
      {name}
      <span>
        <button
          onClick={() => onClickRemove(name)}>
            Deletar
        </button>
        <button
          onClick={() => onClickUpdate(name)}>
            Atualizar
        </button>
      </span>
    </li>
  )
}

Task.propTypes = {
  name: PropTypes.string,
  onClickRemove: PropTypes.func,
  onClickUpdate: PropTypes.func
}
