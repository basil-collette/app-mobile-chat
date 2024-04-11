import { Animated, Easing } from "react-native"

 const easeOutAnimation = (properties, duration, delay, toValue) => {
  Animated.timing(properties, {
    toValue: toValue,
    duration: duration,
    delay: delay,
    easing: Easing.bezier(.2,.52,0,.99),
    useNativeDriver: true,
  }).start();
}

module.exports = {
  easeOutAnimation
}