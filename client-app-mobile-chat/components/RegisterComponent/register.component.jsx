import React, { Component } from 'react';
import AuthTemplate from './register.template.jsx';


export default function RegisterComponent(props) {

  const [state, setState] = React.useState({
    textBackButton: false
  });

  const changeBackButtonState = () => {
    setState({
      ...state,
      textBackButton: !state.textBackButton
    })
  }

  return (
    <AuthTemplate props={props} BackButtonState = {state.textBackButton} changeBackButtonState = {changeBackButtonState} /> 
  );

}