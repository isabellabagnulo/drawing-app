import { FC, useState } from "react"
import { View } from "react-native"
import { Icon } from "@react-native-material/core"

import PressableButton from "./PressableButton"

import buttons from "../../styles/components/ui/buttons"

interface ToolButtonProps {
  icon: string
  color: string
  size: number
  callbackPress?: Function
  callbackLongPress?: Function
}

interface State {}

const ToolButton: FC<ToolButtonProps> = (props) => {
  const InitialState = {}
  const [state, setState] = useState<State>(InitialState)
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

  return (
    <PressableButton
      callbackPress={handlePress}
      callbackLongPress={handleLongPress}
      customStyle={buttons.buttonTool}
    >
      <View>
        <Icon name={props.icon} size={props.size} color={props.color} />
      </View>
    </PressableButton>
  )
}

export default ToolButton
