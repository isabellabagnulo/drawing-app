import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Home from "../screens/Home"
import Sign from "../screens/Sign"
import { HomeStackNavigatorParamList } from "./types"

const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>()

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Sign" component={Sign} />
    </HomeStack.Navigator>
  )
}

export default HomeStackNavigator
