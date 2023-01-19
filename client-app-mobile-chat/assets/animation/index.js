import * as React from "react"
import {Animated,Easing} from "react-native"

const easeOutBackAnimation = (properties,duration,delay,toValue) =>{
  Animated.timing(properties, {
    toValue: toValue,
    duration: duration,
    delay: delay,
    easing: Easing.bezier(0.68, -0.55, 0.265, 1.35),
    useNativeDriver: true,
  }).start();
}


  

module.exports = {easeOutBackAnimation}

