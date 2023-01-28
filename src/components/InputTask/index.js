export const InputTask = ({ taskName, setTaskName, inputRef }) => {
  return (
    <input
      type="text"
      ref={inputRef}
      onChange={e => setTaskName(e.target.value)}
      value={taskName}
    />
  )
}
