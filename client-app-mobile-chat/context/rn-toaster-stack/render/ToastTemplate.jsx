import { View, Text, Animated } from "react-native";
import ToastStyle from "./ToastStyle";

const getStyle = (type) => {
  switch(type) {
    case 'error': return ToastStyle.toastError;
    case 'info': return ToastStyle.toastInfo;
    case 'success': return ToastStyle.toastSuccess;
    default: return ToastStyle.toastInfo;
  }
}

const ToastTemplateSvg = (props) => {
  const ToastSvg = require('./ToastSvg');

  const getSVG = (type) => {
    switch(type) {
      case 'error': return(<ToastSvg.SvgError height={20} width={20} fill="white"></ToastSvg.SvgError>);
      case 'info': return(<ToastSvg.SvgInfo height={20} width={20} fill="white"></ToastSvg.SvgInfo>);
      case 'success': return(<ToastSvg.SvgSuccess height={20} width={20} fill="white"></ToastSvg.SvgSuccess>);
      default: return(<ToastSvg.SvgInfo height={20} width={20} fill="white"></ToastSvg.SvgInfo>);
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

const ToastTemplateBase = (props) => {
  return(
    <Animated.View style={[ToastStyle.toastcontainer, {transform: [{ translateY: props.translateValue }]} ]}>
      <View style={[ToastStyle.toast, getStyle(props.type)]}>

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

export default function ToasterTemplate(props) {
  try {
      require('react-native-svg/package.json').version;

      return ToastTemplateSvg(props);

  } catch (err) {
      console.log(err);
      return ToastTemplateBase(props);

      /*
      if (err.code == "MODULE_NOT_FOUND") {
          return ToastTemplateBase(props);
      } else {
          throw err;
      }
      */
  }

}