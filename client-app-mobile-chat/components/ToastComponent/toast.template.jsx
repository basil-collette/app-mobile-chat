import { View, Text, StatusBar, TouchableWithoutFeedback, Animated } from "react-native";
import { SvgInfo, SvgError, SvgSuccess } from '@assets/svg/';
import toastStyle from "./toast.style.jsx";
import Svg from "react-native-svg";

export default function ToastTemplate(props) {
  return (
    <>
      <View style = {[toastStyle.Toastcontainer,{backgroundColor:props.color}]}>
        {props.svg()}
        <Text style = {toastStyle.messageToast}>{props.message}</Text>
      </View>
    </>
  );
};