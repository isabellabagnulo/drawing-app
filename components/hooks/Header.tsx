import { FC, useState, useEffect } from "react"
import { Button, Image, Text, TouchableOpacity, View } from "react-native"

import header from "../../styles/components/header"

interface HeaderProps {
  children: string | null
  actionVisible: boolean
  goBackVisible: boolean
  callbackReturn?: Function
  callbackGo?: Function
}

interface State {
  actionVisible: boolean
  goBackVisible: boolean
}

const initialState = {
  actionVisible: false,
  goBackVisible: false,
}

const Header: FC<HeaderProps> = (props) => {
  const [state, setState] = useState<State>(initialState)

  useEffect(() => {
    setState({
      ...state,
      actionVisible: props.actionVisible,
      goBackVisible: props.goBackVisible,
    })
  }, [])

  const pressGoBack = (): void => {
    if (!!props.callbackReturn) {
      props.callbackReturn()
    }
  }

  const pressGo = (): void => {
    if (!!props.callbackGo) {
      props.callbackGo()
    }
  }

  return (
    <View style={header.headerContainer}>
      <View style={header.headerTitle}>
        {/* {state.goBackVisible && (
          <TouchableOpacity onPress={pressGoBack} style={header.headerIcon}>
            <Image source={require("../../assets/images/goback.png")}></Image>
          </TouchableOpacity>
        )} */}
        <Text
          style={[
            header.headerTitleLabel,
            state.goBackVisible
              ? header.headerTitlePages
              : header.headerTitleHome,
          ]}
        >
          {props.children}
        </Text>
      </View>
      {/* {state.actionVisible && <Button title={"ok"} onPress={pressGo} />} */}
    </View>
  )
}

export default Header
