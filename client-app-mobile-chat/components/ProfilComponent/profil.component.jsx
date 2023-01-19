import React, { useState, useEffect, useContext } from 'react';
import ProfilTemplate from "./profil.template.jsx";
import { request } from '../../services/RequestService';
import { SocketContext } from '../../context/socket.context';
import StoreService from '@services/StoreService';
import { ENDPOINT_API } from '@env';
import { httpRequest } from '@services/RequestService';
import InputService from '@services/InputService';
import RegexService from '@services/RegexService';

export default function ProfilComponent(props) {

  const [state, setState] = useState({
    userInputs: { idUser: '', prenom: '', nom: '', email: '', createdAt: '', password: '', confirmPassword: '' },
  });

  const verifyUserInputs = () => {
    if (state.userInputs.password !== '') {
      return (
        RegexService.testNameRegex(state.userInputs.prenom) //prenom
        && RegexService.testNameRegex(state.userInputs.nom) //nom
        && RegexService.testEmailRegex(state.userInputs.email)
        && RegexService.testPasswordRegex(state.userInputs.password) //password
        && RegexService.testPasswordRegex(state.userInputs.confirmPassword) //confirmPassword
        && state.userInputs.confirmPassword == state.userInputs.password
      )
    }
    return (
      RegexService.testNameRegex(state.userInputs.prenom) //prenom
      && RegexService.testNameRegex(state.userInputs.nom) //nom
      && RegexService.testEmailRegex(state.userInputs.email)
      //password == confirmPassword
    );
  }
  useEffect(() => {
    getUserDetails();
    console.log("HomeComponent loaded");
    return () => {
      console.log('HomeComponent Destruct');
    };
  }, []);


  const getUserDetails = async () => {
    let userDetails = await StoreService.retrieveData('user');
    userDetails = userDetails
    setState({
      ...state,
      userInputs: { ...state.userInputs, ...userDetails }
    })
  }

  const updateUserDetails = async () => {
    try {
      if (!verifyUserInputs()) {
        //say that inputs are invalids
        return;
      }
      let userDetails = { ...state.userInputs };
      delete userDetails['confirmPassword']
      if (userDetails.password == '') {
        delete userDetails['password']
      }
      console.log(userDetails);
      let request = await httpRequest(`user/auth/${userDetails.idUser}/update/`, 'POST', null, userDetails);
      await StoreService.storeData('user', request)
    } catch (err) {
      console.error(err);
    }
  }

  const updateInput = (inputName, value) => {
    try {
      const newUserInputs = InputService.setInputStates(state.userInputs, inputName, value);
      setState({
        ...state,
        userInputs: newUserInputs
      });
    } catch (err) {
      console.error(err)
    }
  }

  return (<ProfilTemplate updateInput={updateInput} updateUserDetails={updateUserDetails} userDetails={state.userInputs} />);
};