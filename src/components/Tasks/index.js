import PropTypes from 'prop-types'
import { useEffect } from 'react'

import { Task } from '../Task'

export const Tasks = ({
  tasks,
  onClickButtonRemove,
  onClickButtonUpdate
}) => {
  useEffect(() => {

  }, [tasks])

  return (
    <ul>
      {
        tasks.map((taskName, index) =>
          <Task
            key={index}
            name={taskName}
            onClickRemove={onClickButtonRemove}
            onClickUpdate={onClickButtonUpdate}
          />
        )
      }
    </ul>
  )
}

Tasks.propTypes = {
  tasks: PropTypes.array,
  onClickButtonRemove: PropTypes.func,
  onClickButtonUpdate: PropTypes.func
}
