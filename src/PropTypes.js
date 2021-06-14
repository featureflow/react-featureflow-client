// @flow
import PropTypes from 'prop-types'

export const featureflowClientShape = PropTypes.shape({
  evaluate: PropTypes.func.isRequired,
  hasReceivedInitialResponse: PropTypes.func.isRequired
});

export const featureflowConfigShape = PropTypes.shape({
  update: PropTypes.bool.isRequired,
  clientName: PropTypes.string.isRequired
});