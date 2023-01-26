import { useState, useEffect, useContext } from 'react';
import AuthTemplate from './auth.template.jsx';
import { SocketContext } from '@context/socket.context';
import { apiHttpRequest } from '@services/RequestService';
import StoreService from '@services/StoreService';
import InputService from '@services/InputService';
import RegexService from '@services/RegexService';

export default function AuthComponent(props) {

  const currentSocket = useContext(SocketContext);

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

  const finalizeLogin = () => {
    //check if remember login credentials
    props.navigation.navigate('Home');
  }

  //TEMPLATE CALLBACK ________________________________________________________________________________ TEMPLATE CLALBACK

  const updateInput = (inputName, value) => {
    try {
      const newConnexionInputs = InputService.setInputStates(state.connexionInputs, inputName, value);

      setState({
        ...state,
        connexionInputs: newConnexionInputs
      });
    } catch (err) {
      //
    }
  }

  const loginRequest = async () => {

    try {
      if (!verifyLoginInputs()) {
        //say that inputs are invalids
        return;
      }

      let resultToken = await apiHttpRequest('user/login/', 'POST', null, state.connexionInputs);

      if (resultToken) {
        await StoreService.storeData('user', resultToken.user);
        await StoreService.storeData('jwttoken', resultToken.token);
        if (state.rememberStatusCheck) {
          await StoreService.storeData('rememberMe', state.connexionInputs)
        } else {
          await StoreService.forgetData('rememberMe')
        }
        currentSocket.emit('associate_userid_to_socket', resultToken.user.idUser);

        finalizeLogin();

      } else {
        //say that error occured during connexion
      }

    } catch (err) {
      throw new Error(err);
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