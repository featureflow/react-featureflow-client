// @flow

import React, { PropTypes } from 'react';
import Children from 'react-children-utilities';
import { featureflowClientShape } from './PropTypes';
import Variant from './Variant';

import warning from './warning';


export default class Evaluate extends React.Component{
  _handleUpdated;
  evaluated;
  value;
  state: {
    displayedVariant: null
  };

  constructor(props, context){
    super(props, context);

    this.evaluated = context.client.evaluate(props.feature);
    this.value = this.evaluated.value();

    this.state = {
      displayedVariant: this.getDisplayedVariant()
    };

    if (props.realtime === true){
      this._handleUpdated = this.handleUpdated.bind(this);
      this.context.client.on('UPDATED_FEATURE', this._handleUpdated);
    }
  }

  componentWillUnmount(){
    if (this._handleUpdated){
      this.context.client.off('UPDATED_FEATURE', this._handleUpdated);
    }
  }


  handleUpdated(features){
    if (features[this.props.feature] !== this.value){
      this.evaluated = this.context.client.evaluate(this.props.feature);
      this.value = features[this.props.feature];
      this.setState({
        displayedVariant: this.getDisplayedVariant()
      })
    }
  }

  getDisplayedVariant(){
    let displayedVariant = Children.filter(this.props.children, child => {
      if (child.type !== Variant){
        warning('WARNING: <Evaluate ...> will only render <Variant ...> elements');
        return false;
      }
      let is = child.props.is
        || (child.props.isOn && 'on')
        || (child.props.isOff && 'off');

      return this.evaluated.is(is);
    });

    return displayedVariant[0] || null;
  }

  render() {
    return this.state.displayedVariant;
  }
}

Evaluate.contextTypes = {
  client: featureflowClientShape.isRequired
};

Evaluate.proptypes = {
  children: PropTypes.arrayOf(
    PropTypes.element
  ).isRequired,
  static: PropTypes.boolean
};

Evaluate.defaultProps = {
  realtime: true
}