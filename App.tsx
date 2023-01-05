import { StatusBar } from "expo-status-bar"
import { FC } from "react"
import { KeyboardAvoidingView, SafeAreaView, Text, View } from "react-native"
import RootNavigator from "./navigation/index"

import commonStyles from "./styles/commonStyles"

interface AppProps {}

const App: FC<AppProps> = (props) => {
  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding">
        <View style={{ minHeight: "100%" }}>
          <RootNavigator />
          <StatusBar style="auto" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default App
