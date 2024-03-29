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

  /**
   * Récupère l'état du champ "remember me" depuis la mémoire locale.
   * Si la case est cochée, la fonction loginRequest est appelée avec les informations d'authentification stockées dans la mémoire locale.
   * @async
   * @returns {void}
   */
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

  /**
   * Vérifie si les informations de connexion sont valides en utilisant des expressions régulières pour valider le format de l'e-mail et du mot de passe.
   * @param {Object} currentCredentials - Les informations de connexion à valider sous la forme d'un objet contenant les propriétés "email" et "password".
   * @returns {boolean} - True si les informations de connexion sont valides, sinon false.
   */
  const verifyLoginInputs = (currentCredentials) => {
    return (
      RegexService.testNameRegex(currentCredentials.email) &&
      RegexService.testNameRegex(currentCredentials.password)
    );
  };

  //TEMPLATE CALLBACK ________________________________________________________________________________ TEMPLATE CLALBACK

  /**
   * Met à jour la valeur d'un champ de saisie spécifique.
   * @param {string} inputName - Le nom du champ de saisie à mettre à jour.
   * @param {string} value - La nouvelle valeur du champ de saisie.
   * @returns {void}
   */
  const updateInput = (inputName, value) => {
    const newConnexionInputs = InputService.setInputStates(state.connexionInputs, inputName, value);

    setState({
      ...state,
      connexionInputs: newConnexionInputs,
    });
  };

  /**
   * Effectue une requête de connexion avec les informations d'identification des states OU qui sont fournies lors d'une connexion automatique
   * Si la connexion réussit, redirige l'utilisateur vers la page d'accueil.
   * @async
   * @param {Object} currentCredentials - Les informations d'identification de l'utilisateur à utiliser pour la connexion.
   * @returns {void}
   */
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

      // Connecte l'utilisateur enregistrant les informations de connexion dans la mémoire locale.
      await AccountService.login(resultToken.user, resultToken.token, rememberMe);

      // via le socket, demande à l'API d'associer l'ID de l'utilisateur au socket.
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

  /**
   * Modifie le status de la case à cocher "Remember Me".
   * Est appelé par un input checkbox. Met à jour l'état du composant en inversant la valeur de la propriété rememberStatusCheck.
   * @returns {void}
   */
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
