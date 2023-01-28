import PropType from 'prop-types'

export const InputTask = ({ task, setTask, inputRef }) => {
  return (
    <input
      type="text"
      ref={inputRef}
      onChange={e => setTask(e.target.value)}
      value={task}
    />
  )
}

InputTask.propTypes = {
  task: PropType.string,
  setTask: PropType.any,
  inputRef: PropType.any
}
