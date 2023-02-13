import { useState, useEffect, useContext } from 'react';
import AuthTemplate from './auth.template.jsx';
import { SocketContext } from '@context/socket.context';
import { apiHttpRequest } from '@services/RequestService';
import { getLoginURL } from '@endpoint/ApiEndpoint';
import StoreService from '@services/StoreService';
import InputService from '@services/InputService';
import RegexService from '@services/RegexService';
import AccountService from '@services/AccountService';

export default function AuthComponent(props) {

  const socket = useContext(SocketContext);

  const [state, setState] = useState({
    rememberStatusCheck: false,
    connexionInputs: { email: '', password: '' },
  });

  useEffect(() => {
    getRememberMe();

    console.log("AuthComponent loaded");
    return () => {
      console.log('AuthComponent Destruct');
    };
  }, []);

  //FUNCTIONS ________________________________________________________________________________________ FUNCTIONS

  const getRememberMe = async () => {
    let rememberMe = await JSON.parse(await StoreService.retrieveData('rememberMe'));

    if (rememberMe) {
      setState((currentState) => {
        return {
          ...currentState,
          connexionInputs: rememberMe,
          rememberStatusCheck: true
        };
      });
    }
  }

  const verifyLoginInputs = () => {
    return (
      RegexService.testNameRegex(state.connexionInputs.email)
      && RegexService.testNameRegex(state.connexionInputs.password)
    );
  }

  //TEMPLATE CALLBACK ________________________________________________________________________________ TEMPLATE CLALBACK

  const updateInput = (inputName, value) => {
    const newConnexionInputs = InputService.setInputStates(state.connexionInputs, inputName, value);

    setState({
      ...state,
      connexionInputs: newConnexionInputs
    });
  }

  const loginRequest = async () => {
    if (!verifyLoginInputs()) {
      throw new Error('login are in an invalid format');
    }
    
    const resultToken = await apiHttpRequest(getLoginURL(), 'POST', null, state.connexionInputs);

    if (resultToken) {
      const rememberMe = (state.rememberStatusCheck) ? state.connexionInputs : false;

      await AccountService.login(resultToken.user, resultToken.token, rememberMe);

      socket.emit('associate_userid_to_socket', resultToken.user.idUser);

      props.navigation.navigate('Home');
      
    } else {
      throw new Error('error_occured_during_login');
    }
  }

  const goToRegister = () => {
    props.navigation.navigate('Signin');
  }
  const setRememberMe = () => {
    { setState({ ...state, rememberStatusCheck: !state.rememberStatusCheck }) }
  }

  //TEMPLATE RETURN __________________________________________________________________________________ TEMPLATE RETURN

  return (
    <AuthTemplate
      rememberStatus={state.rememberStatusCheck}
      setRememberStatusCheck={setRememberMe}
      registerBtnClick={goToRegister}
      loginBtnClick={loginRequest}
      updateInput={updateInput}
      rememberMe={state.connexionInputs}
    />
  );

}