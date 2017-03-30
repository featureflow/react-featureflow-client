// @flow
import { PropTypes } from 'react'

export const featureflowClientShape = PropTypes.shape({
  evaluate: PropTypes.func.isRequired,
  on: PropTypes.func.isRequired,
  off: PropTypes.func.isRequired
});