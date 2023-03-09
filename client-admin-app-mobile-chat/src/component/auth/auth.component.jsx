import AuthTemplate from "./auth.template";
import { React, useState } from "react";
import { apiHttpRequest } from "../../services/RequestService";
import * as StoreService from "../../services/StoreService";
import * as InputService from "../../services/InputService";
import { useNavigate } from "react-router-dom";

export default function AuthComponent(props) {
  const [state, setState] = useState({
    connexionInputs: { email: "", password: "" },
  });

  const navigate = useNavigate();

  const authSubmit = async (e) => {
    try {
      e.preventDefault();
      let resultToken = await apiHttpRequest("user/login/", "POST", null, state.connexionInputs);
      
      if (resultToken) {
        StoreService.storeData("user", resultToken.user);
        StoreService.storeData("jwttoken", resultToken.token);
        navigate("/admin");
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  const updateInput = (inputName, value) => {
    try {
      const newConnexionInputs = InputService.setInputStates(
        state.connexionInputs,
        inputName,
        value
      );

      setState({
        ...state,
        connexionInputs: newConnexionInputs,
      });
      
    } catch (err) {
      console.log(err);
    }
  };

  return <AuthTemplate authSubmit={authSubmit} updateInput={updateInput} />;
}
