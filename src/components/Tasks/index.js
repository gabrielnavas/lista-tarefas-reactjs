import { Task } from '../Task'

export const Tasks = ({
  tasks,
  onClickButtonRemove,
  onClickButtonUpdate
}) => {
  return (
    <ul>
      {
        tasks.map((task, index) =>
          <Task
            key={index}
            task={task}
            onClickRemove={onClickButtonRemove}
            onClickUpdate={onClickButtonUpdate}
          />
        )
      }
    </ul>
  )
}
