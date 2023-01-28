import PropTypes from 'prop-types'

export const ButtonConfirmTask = ({
  isUpdating,
  onClickButtonFinishUpdate,
  onClickButtonAddTasks
}) => {
  return (
    <button type="button"
      onClick={
        isUpdating
          ? onClickButtonFinishUpdate
          : onClickButtonAddTasks
        }>
      {isUpdating ? 'Atualizar' : 'Inserir'}
    </button>
  )
}

ButtonConfirmTask.propTypes = {
  isUpdating: PropTypes.bool,
  onClickButtonFinishUpdate: PropTypes.func,
  onClickButtonAddTasks: PropTypes.func
}
