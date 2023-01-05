import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { Provider } from "react-redux"
import { IconComponentProvider, Icon } from "@react-native-material/core"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

import HomeStackNavigator from "./HomeStack"
import store from "../redux/store"

const RootNavigator = () => {
  return (
    <Provider store={store}>
      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <NavigationContainer>
          <HomeStackNavigator />
        </NavigationContainer>
      </IconComponentProvider>
    </Provider>
  )
}

export default RootNavigator
