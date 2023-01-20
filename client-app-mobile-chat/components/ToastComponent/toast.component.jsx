import React, { Component, useContext, useState, useEffect, useRef,forwardRef } from 'react';
import ToastTemplate from "./toast.template.jsx";
import { SocketContext } from '@context/socket.context';
import Toast from 'react-native-toast-message';
import { SvgError, SvgInfo,SvgSuccess } from '@assets/svg/'; 

export default function ToastComponent(props) {

  const socket = useContext(SocketContext);

  const [state, setState] = useState({

  });
  useEffect(() => {
    Toast.show({
      type: props.type,
      props: { uuid: 'bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d70', content : props.message }
    });
    return () => {
      
    };
  }, []);


const toastConfig = {
  error: () => (
    <ToastTemplate message = {props.message} color = {'#CC5656'} svg ={() => <SvgError height = {30} width = {30} fill="white"></SvgError>}/>
  ),
  info: () => (
    <ToastTemplate message = {props.message} color = {'#3BCBEB'} svg ={() => <SvgInfo height = {30} width = {30} fill="white"></SvgInfo>}/>
  ),
  success: () => (
    <ToastTemplate message = {props.message} color = {'#46C843'} svg ={() => <SvgSuccess height = {30} width = {30} fill="white"></SvgSuccess>}/>
  ),
}


  return (
    <Toast config={toastConfig}/>
  );

};