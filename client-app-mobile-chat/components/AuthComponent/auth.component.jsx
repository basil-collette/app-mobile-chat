import React, { Component } from 'react';
import AuthTemplate from './auth.template.jsx';


export default function AuthComponent(props) {

  const [state, setState] = React.useState({
    checked: false
  });

  const changeRadioButtonState = () => {
    setState({
      ...state,
      checked:!state.checked
    })
  }


  return (
    <AuthTemplate props={props} getCheckState={state.checked} changeCheckState={changeRadioButtonState} /> 
  );

}