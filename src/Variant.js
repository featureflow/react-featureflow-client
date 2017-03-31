// @flow
import React, { Component, PropTypes, Children } from 'react';

export default function Variant(props){
  if (props.children.length <= 1){
    return props.children[0]
  }
  else{
    return (
      <div>
        {props.children}
      </div>
    )
  }
}



