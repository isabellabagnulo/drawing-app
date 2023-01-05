import { FC, useEffect, useState } from "react"
import { ImageBackground, ScrollView, Text, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import Header from "../components/hooks/Header"
import OpacityButton from "../components/ui/OpacityButton"

import i18n from "../assets/translations/i18n"

import { NavigationType, RouteType, Work } from "../types"

import commonStyles from "../styles/commonStyles"
import buttons from "../styles/components/ui/buttons"

interface HomeProps {
  navigation: NavigationType
  route: RouteType
}

interface State {
  works: Array<Work>
}

const Home: FC<HomeProps> = ({ navigation, route }) => {
  const InitialState = {
    works: [],
  }
  const [state, setState] = useState<State>(InitialState)

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (route.params) {
      const { objWork } = route.params
      setState({
        ...state,
        works: [...state.works, objWork],
      })
    }

    storeData(state.works)
  }, [route.params])

  const getData = async (): Promise<void> => {
    try {
      let arr: Array<Work> = []
      const value = await AsyncStorage.getItem("works")

      if (value === null) {
        arr = []
      } else {
        arr = JSON.parse(value)
      }

      setState({
        ...state,
        works: arr,
      })
    } catch (e) {
      console.log("contatti vuoto")
    }
  }

  const storeData = async (value: Array<Work>): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem("works", jsonValue)
    } catch (e) {
      console.log("set fallito")
    }
  }

  const removeValue = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem("contacts")
      setState({
        ...state,
        works: [],
      })
    } catch (e) {}
  }

  const goToSign = (): void => {
    navigation.navigate("Sign")
  }

  const mapWorks = (work: Work, key: number): JSX.Element => {
    let fileName = work?.uri.replace(
      "file:///var/mobile/Containers/Data/Application/776A4654-3D3D-4C14-A839-438E8C21972C/Library/Caches/ExponentExperienceData/%2540isabellabagnulobeije%252Fdrawing-app/",
      ""
    )
    return (
      <View key={key} style={commonStyles.workContainer}>
        <View style={commonStyles.work}>
          <ImageBackground
            source={{ uri: work?.uri }}
            resizeMode="cover"
            style={{ flex: 1 }}
          />
        </View>

        <Text style={commonStyles.paragraph}>{fileName}</Text>
      </View>
    )
  }

  return (
    <>
      <Header actionVisible={false} goBackVisible={false}>
        {i18n.t("titleHome")}
      </Header>
      <View style={[commonStyles.genericContainer, commonStyles.homeContainer]}>
        <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
          <View style={commonStyles.gridSection}>
            {state.works && state.works.length > 0 ? (
              state.works.map(mapWorks)
            ) : (
              <View
                style={[
                  commonStyles.workContainer,
                  commonStyles.workContainerCentered,
                ]}
              >
                <Text
                  style={[commonStyles.paragraph, commonStyles.paragraphBig]}
                >
                  {i18n.t("worksEmpty")}
                </Text>
              </View>
            )}
          </View>

          {state.works && state.works.length > 0 && (
            <OpacityButton
              callback={removeValue}
              customStyle={[
                buttons.buttonContainer,
                buttons.secondaryButton,
                buttons.dangerButton,
              ]}
            >
              <Text>{i18n.t("deleteAll")}</Text>
            </OpacityButton>
          )}
        </ScrollView>

        <OpacityButton
          callback={goToSign}
          customStyle={[buttons.buttonContainer, buttons.primaryButton]}
        >
          <Text>{i18n.t("create")}</Text>
        </OpacityButton>
      </View>
    </>
  )
}
export default Home
