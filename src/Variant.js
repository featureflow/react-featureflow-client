// @flow
import React, { Component, PropTypes, Children } from 'react';

export default class Variant extends Component{
  render(){
    return Children.only(this.props.children);
  }
}

Variant.propTypes = {
  children: PropTypes.element.isRequired
};

