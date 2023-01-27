import React, { useEffect } from 'react';
import ToastTemplate from "./toast.template.jsx";
import Toast from 'react-native-toast-message';
import { SvgError, SvgInfo,SvgSuccess } from '@assets/svg/'; 

export default function ToastComponent(props) {

  useEffect(() => {
    Toast.show({
      type: props.type,
      props: { content : props.message }
    });

    return () => {
      
    };
  }, []);

  const toastConfig = {
    error: () => (
      <ToastTemplate message={props.message} color={'#CC5656'} svg={() => <SvgError height={30} width={30} fill="white"></SvgError>}/>
    ),
    info: () => (
      <ToastTemplate message={props.message} color={'#3BCBEB'} svg={() => <SvgInfo height={30} width={30} fill="white"></SvgInfo>}/>
    ),
    success: () => (
      <ToastTemplate message={props.message} color={'#46C843'} svg={() => <SvgSuccess height={30} width={30} fill="white"></SvgSuccess>}/>
    ),
  }

  return (
    <Toast config={toastConfig}/>
  );

};