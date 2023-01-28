import PropTypes from 'prop-types'

import './index.css'

export const MessageError = ({ message }) => {
  return (
    <div className='message'>
      {message}
    </div>
  )
}

MessageError.propTypes = {
  message: PropTypes.string
}
