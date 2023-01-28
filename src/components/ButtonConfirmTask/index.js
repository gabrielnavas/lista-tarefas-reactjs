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
