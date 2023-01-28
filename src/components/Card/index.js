import PropTypes from 'prop-types'

import './index.css'

export const Card = ({ children }) => {
  return (
    <div className='container__card'>{children}</div>
  )
}

Card.propTypes = {
  children: PropTypes.any
}
