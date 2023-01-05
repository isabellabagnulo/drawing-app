import React, { FC } from "react"
import { Image, KeyboardTypeOptions, TextInput, View } from "react-native"

import input from "../../styles/components/ui/input"

interface InputProps {
  placeholder?: string
  value?: string | undefined
  type?: KeyboardTypeOptions | undefined
  callbackChange: Function
  callbackBlur?: Function
}

const Inputbox: FC<InputProps> = (props) => {
  const handleInput = (e: string): void => {
    props.callbackChange(e)
  }

  const handleBlur = (): void => {
    if (!!props.callbackBlur) {
      props.callbackBlur()
    }
  }

  return (
    <View style={input.inputContainer}>
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={"rgba(0,0,0,0.3)"}
        value={props.value}
        keyboardType={props.type}
        onChangeText={handleInput}
        onBlur={handleBlur}
        style={input.input}
      />
    </View>
  )
}

export default Inputbox
