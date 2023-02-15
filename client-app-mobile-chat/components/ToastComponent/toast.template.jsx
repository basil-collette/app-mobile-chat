import { View, Text, TouchableWithoutFeedback, Animated } from "react-native";
import { SvgInfo, SvgError, SvgSuccess } from '@assets/svg/';
import ToastStyle from "./toast.style.jsx";

export default function ToastTemplate(props) {

  const getStyle = (type) => {
    switch(type) {
      case 'error': return ToastStyle.toastError;
      case 'info': return ToastStyle.toastInfo;
      case 'success': return ToastStyle.toastSuccess;
      default: return ToastStyle.toastInfo;
    }
  }

  const getSVG = (type) => {
    switch(type) {
      case 'error': return(<SvgError height={20} width={20} fill="white"></SvgError>);
      case 'info': return(<SvgInfo height={20} width={20} fill="white"></SvgInfo>);
      case 'success': return(<SvgSuccess height={20} width={20} fill="white"></SvgSuccess>);
      default: return(<SvgInfo height={20} width={20} fill="white"></SvgInfo>);
    }
  }

  return(
    <Animated.View style={[ToastStyle.toastcontainer, {transform: [{ translateY: props.translateValue }]} ]}>
      <View style={[ToastStyle.toast, getStyle(props.type)]}>
        {getSVG(props.type)}

        <Text style={ToastStyle.toastMessage}>{props.message}</Text>

        {/* 
            //INDICATEUR DU TEMPS D'AFFICHAGE DU TOAST
            <View style={{ marginHorizontal: 5, borderLeftColor: 'white', borderLeftWidth: 1, height: 20 }}></View>
            <Text style={{ margin: 1, color: 'white' }}>{props.count}</Text>
        */}
      </View>
    </Animated.View>
  );
  
};