import { FC } from "react"
import { Pressable, Text } from "react-native"

interface PressableButtonProps {
  children: any
  customStyle?: object
  callbackPress?: Function
  callbackLongPress?: Function
  callbackPressOut?: Function
}

const PressableButton: FC<PressableButtonProps> = (props) => {
  const handlePress = (): void => {
    if (!!props.callbackPress) {
      props.callbackPress()
    }
  }

  const handleLongPress = (): void => {
    if (!!props.callbackLongPress) {
      props.callbackLongPress()
    }
  }

  const handlePressOut = (): void => {
    if (!!props.callbackPressOut) {
      props.callbackPressOut()
    }
  }

  return (
    <Pressable
      onPress={handlePress}
      onLongPress={handleLongPress}
      onPressOut={handlePressOut}
      style={props.customStyle}
    >
      {props.children}
    </Pressable>
  )
}

export default PressableButton
