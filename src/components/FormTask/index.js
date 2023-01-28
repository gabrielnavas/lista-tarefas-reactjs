import PropTypes from 'prop-types'

export const FormTask = ({ children }) => {
  return (
    <form>
      {children}
    </form>
  )
}

FormTask.propTypes = {
  children: PropTypes.array
}
