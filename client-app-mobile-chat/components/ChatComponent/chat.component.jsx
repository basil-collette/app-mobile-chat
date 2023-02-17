import React, { useState, useEffect, useContext, useRef } from "react";
import ChatTemplate from "./chat.template.jsx";
import GlobalTemplate from "@comp/GlobalComponent/global.template.jsx";
import { apiHttpRequest } from "@services/RequestService";
import {
  getGetMessageUserURL,
  getGetMessageSalonURL,
  getGetUserURL,
  getSendMessageSalonURL,
  getSendMessageUserURL,
} from "@endpoint/ApiEndpoint";
import * as StoreService from "@services/StoreService";
import { SvgProfil } from "@assets/svg";
import ChappyError from '@error/ChappyError';
//CONTEXT
import { SocketContext } from "@context/socket.context";
import { ToastContext, ChappyToast } from "@context/toast.context";
import { ErrorContext } from "@context/error.context";

export default function ChatComponent(props) {
  const CONTEXTS = {
    socket: useContext(SocketContext),
    ErrorContext: useContext(ErrorContext),
    addToast: useContext(ToastContext),
  };

  const NB_LOADED_MESSAGES = 20;

  const refScrollView = useRef();
  const refMsgInput = useRef();
  const refSendBtn = useRef();

  const [state, setState] = useState({
    chatLibelle: props.navigation.state.params.chatLibelle,
    typeChat: props.navigation.state.params.typeChat,
    idDestination: props.navigation.state.params.idDestination,
    connectedUser: { idUser: "", prenom: "", nom: "" },
    msgInput: "",
    messages: [],
    messagesShowed: [],
    interlocutorIsConnected: false,
  });

  useEffect(() => {
    init();

    if (state.typeChat == 'user') {
      setInterlocutorState();
    
      var setInterlocuteurStateRemoverInterval = setInterval(() => {
        setInterlocutorState();
      }, 3000);
    }

    console.log("ChatComponent loaded");
    return () => {
      CONTEXTS.socket.off("new_chatmsg_to_client");

      if (state.typeChat == "salon") {
        CONTEXTS.socket.emit("leave_room", state.idDestination);
      }

      clearInterval(setInterlocuteurStateRemoverInterval);
      console.log("ChatComponent Destruct");
    };
  }, []);

  //FUNCTIONS ________________________________________________________________________________________ FUNCTIONS

  const addMsg = (msg) => {
    setState((currentState) => {
      return {
        ...currentState,
        messagesShowed: [...currentState.messagesShowed, msg],
      };
    });
  };

  const init = async () => {
    try {
      CONTEXTS.socket.on("new_chatmsg_to_client", (msg) => {
        addMsg(msg);
      });
  
      if (state.typeChat == 'salon') {
  
        CONTEXTS.socket.emit('join_room', state.idDestination);
  
      }

      const userResult = await JSON.parse(
        await StoreService.retrieveData("user")
      );

      const endpoint =
        state.typeChat == "user"
          ? getGetMessageUserURL(state.idDestination)
          : getGetMessageSalonURL(state.idDestination);

      const messagesResult = await apiHttpRequest(endpoint, "GET", null, null);

      setState((currentState) => {
        if (messagesResult.length > NB_LOADED_MESSAGES) {
          return {
            ...currentState,
            messages: messagesResult.slice(
              0,
              messagesResult.length - NB_LOADED_MESSAGES
            ),
            messagesShowed: messagesResult.slice(
              messagesResult.length - NB_LOADED_MESSAGES,
              messagesResult.length
            ),
            connectedUser: userResult,
          };
        } else {
          return {
            ...currentState,
            messages: [],
            messagesShowed: messagesResult,
            connectedUser: userResult,
          };
        }
      });
    } catch (err) {
      if (!(err instanceof ChappyError))
        err = new ChappyError(err.message, false, "ChatComponent.init()");
      CONTEXTS.ErrorContext.handleError(err, err.isFatal);
    }
  };

  const setInterlocutorState = async () => {
    try {
      const interlocutor = await apiHttpRequest(
        getGetUserURL(state.idDestination),
        "GET",
        null,
        null
      );

      setState((currentState) => {
        return {
          ...currentState,
          interlocutorIsConnected: interlocutor.isConnected,
        };
      });
    } catch (err) {
      if (!(err instanceof ChappyError))
        err = new ChappyError(
          err.message,
          false,
          "ChatComponent.setInterlocutorState()"
        );
      CONTEXTS.ErrorContext.handleError(err, err.isFatal);
    }
  };

  //TEMPLATE CALLBACK ________________________________________________________________________________ TEMPLATE CLALBACK

  const goOption = () => {
    props.navigation.navigate("Option", {});
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const sendMessage = async () => {
    if (state.msgInput.trim() == "") {
      return;
    }

    const body = {
      content: state.msgInput,
    };

    let endPoint;
    if (state.typeChat == "salon") {
      endPoint = getSendMessageSalonURL();
      body.idSalon = state.idDestination;
    } else if (state.typeChat == "user") {
      endPoint = getSendMessageUserURL();
      body.idUserReceiver = state.idDestination;
    } else {
      throw new ChappyError(
        "typechat isnt correct",
        false,
        "ChatComponent.sendMessage()"
      );
    }

    try {
      const response = await apiHttpRequest(endPoint, "POST", null, body);

      refMsgInput.current.clear();

      setState((currentState) => {
        return {
          ...currentState,
          msgInput: "",
        };
      });
    } catch (err) {
      if (!(err instanceof ChappyError))
        err = new ChappyError(
          err.message,
          false,
          "ChatComponent.sendMessage()"
        );
      CONTEXTS.ErrorContext.handleError(err, err.isFatal);
    }
  };

  const updateMsgInput = (value) => {
    setState((currentState) => {
      return {
        ...currentState,
        msgInput: value,
      };
    });
  };

  const getPreviousMessage = () => {
    setState((currentState) => {
      if (currentState.messages.length > NB_LOADED_MESSAGES) {
        let previousMessage = currentState.messages.slice(
          currentState.messages.length - NB_LOADED_MESSAGES
        );
        previousMessage.push(...currentState.messagesShowed);
        return {
          ...currentState,
          messages: currentState.messages.slice(
            0,
            currentState.messages.length - NB_LOADED_MESSAGES
          ),
          messagesShowed: previousMessage,
        };
      } else {
        return {
          ...currentState,
          messagesShowed: [
            ...currentState.messages,
            ...currentState.messagesShowed,
          ],
          messages: [],
        };
      }
    });
  };

  //TEMPLATE RETURN __________________________________________________________________________________ TEMPLATE RETURN

  return (
    <GlobalTemplate
      title={state.chatLibelle}
      SVGProfil={
        state.typeChat == "user"
          ? () => (
              <SvgProfil
                height={25}
                width={25}
                fill={
                  state.interlocutorIsConnected == true ? "#43C851" : "#CC5656"
                }
              ></SvgProfil>
            )
          : null
      }
      goBack={goBack}
      goOption={goOption}
    >
      <ChatTemplate
        connectedUser={state.connectedUser}
        messages={state.messages}
        sendMessage={sendMessage}
        updateMsgInput={updateMsgInput}
        scrollView={refScrollView}
        msgInput={refMsgInput}
        refSendBtn={refSendBtn}
        messagesShowed={state.messagesShowed}
        getPreviousMessage={getPreviousMessage}
      />
    </GlobalTemplate>
  );
}
