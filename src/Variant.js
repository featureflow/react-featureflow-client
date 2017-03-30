// @flow
import React, { PropTypes, Children } from 'react';

export default class Variant extends React.Component{
  render(){
    return Children.only(this.props.children);
  }
}

Variant.propTypes = {
  children: PropTypes.element.isRequired
};

