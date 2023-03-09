import { useState, useEffect, useContext } from 'react';
import { StackActions } from '@react-navigation/native';
import { apiHttpRequest } from '@services/RequestService';
import StoreService from '@services/StoreService';
import InputService from '@services/InputService';
import RegexService from '@services/RegexService';
import AccountService from '@services/AccountService';
import { getLoginURL } from '@endpoint/ApiEndpoint';
import ChappyError from '@error/ChappyError';
import AuthTemplate from './auth.template.jsx';
//CONTEXT
import { SocketContext } from '@context/socket.context';
import { ErrorContext } from '@context/error.context';

export default function AuthComponent(props) {
  
  const CONTEXTS = {
    socket: useContext(SocketContext),
    ErrorContext: useContext(ErrorContext)
  };

  const [state, setState] = useState({
    rememberStatusCheck: true,
    connexionInputs: { email: "", password: "" },
  });

  useEffect(() => {
    getRememberMe();

    console.log("AuthComponent loaded");
    return () => {
      console.log("AuthComponent Destruct");
    };
  }, []);

  //FUNCTIONS ________________________________________________________________________________________ FUNCTIONS

  const getRememberMe = async () => {
    let rememberMe = await JSON.parse(
      await StoreService.retrieveData("rememberMe")
    );

    if (rememberMe) {
      /*
      setState((currentState) => {
        return {
          ...currentState,
          connexionInputs: rememberMe,
          rememberStatusCheck: true,
        };
      });
      */

      loginRequest(rememberMe);
    }
  };

  const verifyLoginInputs = (currentCredentials) => {
    return (
      RegexService.testNameRegex(currentCredentials.email) &&
      RegexService.testNameRegex(currentCredentials.password)
    );
  };

  //TEMPLATE CALLBACK ________________________________________________________________________________ TEMPLATE CLALBACK

  const updateInput = (inputName, value) => {
    const newConnexionInputs = InputService.setInputStates(state.connexionInputs, inputName, value);

    setState({
      ...state,
      connexionInputs: newConnexionInputs,
    });
  };

  const loginRequest = async (currentCredentials) => {
    try {
      credentials = currentCredentials ?? state.connexionInputs;

      if (!verifyLoginInputs(credentials)) {
        throw new ChappyError("login inputs are in an invalid format", false, "AuthComponent.loginRequest()");
      }

      const resultToken = await apiHttpRequest(getLoginURL(), "POST", null,  credentials, true);

      const rememberMe = (currentCredentials ?? state.rememberStatusCheck)
        ? credentials
        : false;

      await AccountService.login(resultToken.user, resultToken.token, rememberMe);

      CONTEXTS.socket.emit(
        "associate_userid_to_socket",
        resultToken.user.idUser
      );

      //props.navigation.dispatch(StackActions.pop(1));
      props.navigation.replace("Home");

    } catch (err) {
      if (!(err instanceof ChappyError))
        err = new ChappyError(err.message, false, "AuthComponent.loginRequest()");
      CONTEXTS.ErrorContext.handleError(err, err.isFatal);
    }
  };

  const goToRegister = () => {
    props.navigation.navigate("Signin");
  };

  const setRememberMe = () => {
    setState((currentState) => {
      return {
        ...currentState,
        rememberStatusCheck: !state.rememberStatusCheck,
      };
    });
  };

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
