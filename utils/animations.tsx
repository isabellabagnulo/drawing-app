import { Animated } from "react-native"

export const fadeIn = (animation: any): void => {
  // Will change fadeAnim value to 1 in 5 seconds
  Animated.timing(animation, {
    toValue: 1,
    duration: 300,
    useNativeDriver: false,
  }).start()
}

export const translateIn = (animation: any): void => {
  // Will change fadeAnim value to 1 in 5 seconds
  Animated.timing(animation, {
    toValue: 0,
    duration: 300,
    useNativeDriver: false,
  }).start()
}

export const translateOut = (animation: any): void => {
  // Will change fadeAnim value to 1 in 5 seconds
  Animated.timing(animation, {
    toValue: 400,
    duration: 300,
    useNativeDriver: false,
  }).start()
}
