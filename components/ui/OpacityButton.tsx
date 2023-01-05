import { FC } from "react"
import { Text, TouchableOpacity, View } from "react-native"

import buttons from "../../styles/components/ui/buttons"

interface OpacityButtonProps {
  children: any
  customStyle?: object
  callback?: Function
}

const OpacityButton: FC<OpacityButtonProps> = (props) => {
  const pressButton = (): void => {
    if (!!props.callback) {
      props.callback()
    }
  }

  return (
    <TouchableOpacity onPress={pressButton} style={props.customStyle}>
      {props.children}
    </TouchableOpacity>
  )
}

export default OpacityButton
