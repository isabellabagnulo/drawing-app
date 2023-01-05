import { useEffect, useRef, useState } from "react"
import { Animated, Image, Modal, ScrollView, Text, View } from "react-native"
import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas"
import Slider from "@react-native-community/slider"
import ColorPicker from "react-native-wheel-color-picker"
import { Icon } from "@react-native-material/core"
import * as ImagePicker from "expo-image-picker"
import * as MediaLibrary from "expo-media-library"
import * as FileSystem from "expo-file-system"

import Inputbox from "../components/ui/InputBox"
import PressableButton from "../components/ui/PressableButton"
import ModalComponent from "../components/hooks/ModalComponent"
import OpacityButton from "../components/ui/OpacityButton"
import ToolButton from "../components/ui/ToolButton"

import i18n from "../assets/translations/i18n"

import { fadeIn, translateIn, translateOut } from "../utils/animations"

import { NavigationType, Result, Work } from "../types"

import commonStyles from "../styles/commonStyles"
import { signatureStyle } from "../styles/components/sign"
import buttons from "../styles/components/ui/buttons"

interface SignProps {
  navigation: NavigationType
}

interface State {
  brushModalVisible: boolean
  colorModalVisible: boolean
  clearModalVisible: boolean
  savingModalVisible: boolean
  correctSavingModalVisible: boolean
  errorSavingModalVisible: boolean
  emptyModalVisible: boolean
  brushWidth: number
  currentColor: string
  active: number
  signature: string
  bgImage: string | undefined
  work: Work
  fileName: string
  errorVisible: boolean
}

const InitialState = {
  brushModalVisible: false,
  colorModalVisible: false,
  clearModalVisible: false,
  savingModalVisible: false,
  correctSavingModalVisible: false,
  errorSavingModalVisible: false,
  emptyModalVisible: false,
  brushWidth: 1,
  currentColor: "000",
  active: 0,
  signature: "",
  bgImage: "",
  work: {
    exists: false,
    isDirectory: false,
    md5: "",
    modificationTime: 0,
    size: 0,
    uri: "",
  },
  fileName: "",
  errorVisible: false,
}

let validate: boolean = false

const Sign: React.FC<SignProps> = ({ navigation }) => {
  const [state, setState] = useState<State>(InitialState)

  const ref = useRef<SignatureViewRef>(null)

  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateAnim = useRef(new Animated.Value(400)).current

  useEffect(() => {
    getPermissions()
  }, [])

  const getPermissions = async (): Promise<void> => {
    const imagePicker = await ImagePicker.requestMediaLibraryPermissionsAsync()
    const camera = await ImagePicker.requestCameraPermissionsAsync()
    const mediaLibrary = await MediaLibrary.requestPermissionsAsync()
    if (
      imagePicker.status !== "granted" &&
      camera.status !== "granted" &&
      mediaLibrary.status !== "granted"
    ) {
      getPermissions()
    }
  }

  const handleConfirm = (): void => {
    console.log("validate in confirm", validate)
    if (validate) {
      ref.current?.readSignature()
      translateIn(translateAnim)
      setState({
        ...state,
        savingModalVisible: false,
        correctSavingModalVisible: true,
      })
    }
  }

  const handleOK = (signature: string) => {
    console.log("validate", validate)
    const path = FileSystem.cacheDirectory + state.fileName + ".png"

    FileSystem.writeAsStringAsync(
      path,
      signature.replace("data:image/png;base64,", ""),
      { encoding: FileSystem.EncodingType.Base64 }
    )
      .then((res) => {
        console.log(res)
        FileSystem.getInfoAsync(path, { size: true, md5: true }).then(
          async (file) => {
            try {
              await MediaLibrary.saveToLibraryAsync(file.uri)
              setState({
                ...state,
                work: file,
                correctSavingModalVisible: true,
              })
              console.log("file", file)

              console.log("Image successfully saved", file)
            } catch {
              setState({
                ...state,
                errorSavingModalVisible: true,
              })
            }
          }
        )
      })
      .catch((err) => {
        console.log("err", err)
      })
  }

  const handleDraw = (): void => {
    ref.current?.draw()
    setState({
      ...state,
      active: 1,
    })
  }

  const handleBrushWidth = (value: number): void => {
    let penSize = Math.floor(value)
    ref.current?.changePenSize(penSize, penSize)
    setState({
      ...state,
      brushWidth: penSize,
      active: 1,
    })
  }

  const handleColor = (color: string): void => {
    let colorPicked = color
    ref.current?.changePenColor(colorPicked)
    setState({
      ...state,
      currentColor: colorPicked,
      active: 2,
    })
  }

  const handleErase = (): void => {
    ref.current?.erase()
    setState({
      ...state,
      active: 3,
    })
  }

  const handleUndo = (): void => {
    ref.current?.undo()
    setState({
      ...state,
      active: 4,
    })
  }

  const handleRedo = (): void => {
    ref.current?.redo()
    setState({
      ...state,
      active: 5,
    })
  }

  const handleClear = () => {
    ref.current?.clearSignature()
    setState({
      ...state,
      clearModalVisible: false,
    })
  }

  const pickImage = async (): Promise<void> => {
    setState({
      ...state,
      bgImage: "",
    })
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
      base64: true,
    })

    console.log("result", result)

    if (!result.cancelled) {
      let img: string | undefined = result.base64
      console.log("base64", img)

      setState({
        ...state,
        bgImage: "data:image/png;base64," + img,
      })
    }
  }

  const takePhoto = async (): Promise<void> => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [9, 16],
      base64: true,
      quality: 0.2,
    })
    console.log("take photo", result)
    if (!result.cancelled) {
      setState({
        ...state,
        bgImage: "data:image/png;base64," + result.base64,
      })
    }
  }

  const openBrushModal = (): void => {
    translateIn(translateAnim)
    setState({
      ...state,
      brushModalVisible: true,
    })
    console.log("translateAnimIn", translateAnim)
  }
  const openColorModal = (): void => {
    translateIn(translateAnim)
    setState({
      ...state,
      colorModalVisible: true,
    })
  }
  const openClearModal = (): void => {
    translateIn(translateAnim)
    setState({
      ...state,
      clearModalVisible: true,
    })
  }
  const openSavingModal = (): void => {
    fadeIn(fadeAnim)
    setState({
      ...state,
      savingModalVisible: true,
    })
  }
  const openEmptyModal = (): void => {
    setState({
      ...state,
      emptyModalVisible: true,
    })
  }
  const closeModal = (): void => {
    handleDraw()

    translateOut(translateAnim)
    console.log("translateAnimOut", translateAnim)

    setState({
      ...state,
      brushModalVisible: false,
      colorModalVisible: false,
      clearModalVisible: false,
      savingModalVisible: false,
      correctSavingModalVisible: false,
      errorSavingModalVisible: false,
    })
  }

  const goToHome = (): void => {
    navigation.navigate("Home", { objWork: state.work })
  }

  function isNotWhiteSpace(valueString: string): boolean {
    return /^\S+$/.test(valueString)
  }

  function isEmptySpace(valueString: string): boolean {
    return /^\s*$/.test(valueString)
  }

  const getName = (e: string): void => {
    let value: string = e
    console.log("true o false?", isEmptySpace(value))
    if (isNotWhiteSpace(value) && !isEmptySpace(value)) {
      validate = true
    } else {
      validate = false
    }

    if (validate) {
      setState({
        ...state,
        fileName: value,
        errorVisible: false,
      })
    } else {
      setState({
        ...state,
        errorVisible: true,
      })
    }
  }

  return (
    <View style={commonStyles.genericContainer}>
      {state.bgImage && (
        <SignatureScreen
          ref={ref}
          maxWidth={state.brushWidth}
          minWidth={state.brushWidth}
          autoClear={false}
          dataURL={state.bgImage ? state.bgImage : ""}
          onOK={handleOK}
          onEmpty={openEmptyModal}
          webStyle={signatureStyle}
        />
      )}
      {!state.bgImage && (
        <SignatureScreen
          ref={ref}
          backgroundColor={"rgba(255,255,255,1)"}
          maxWidth={state.brushWidth}
          minWidth={state.brushWidth}
          autoClear={false}
          onOK={handleOK}
          onEmpty={openEmptyModal}
          webStyle={signatureStyle}
        />
      )}

      <View style={buttons.buttonsToolsContainer}>
        <ToolButton
          icon={"brush"}
          size={24}
          color={state.active === 1 ? "#E1FF00" : "rgba(255, 255, 255, 0.7)"}
          callbackLongPress={openBrushModal}
          callbackPress={handleDraw}
        />

        <PressableButton
          callbackPress={openColorModal}
          customStyle={buttons.buttonTool}
        >
          <View
            style={[
              buttons.buttonBorder,
              state.active === 2
                ? { backgroundColor: "#E1FF00" }
                : { backgroundColor: "rgba(255, 255, 255, 0.7)" },
            ]}
          >
            <Icon
              name={"checkbox-blank-circle"}
              size={24}
              color={state.currentColor}
            />
          </View>
        </PressableButton>

        <ToolButton
          icon={"eraser"}
          size={24}
          color={state.active === 3 ? "#E1FF00" : "rgba(255, 255, 255, 0.7)"}
          callbackPress={handleErase}
        />
        <ToolButton
          icon={"undo"}
          size={24}
          color={state.active === 4 ? "#E1FF00" : "rgba(255, 255, 255, 0.7)"}
          callbackPress={handleUndo}
        />
        <ToolButton
          icon={"redo"}
          size={24}
          color={state.active === 5 ? "#E1FF00" : "rgba(255, 255, 255, 0.7)"}
          callbackPress={handleRedo}
        />
        <ToolButton
          icon={"camera"}
          size={24}
          color={state.active === 6 ? "#E1FF00" : "rgba(255, 255, 255, 0.7)"}
          callbackPress={takePhoto}
        />
        <ToolButton
          icon={"file-image"}
          size={24}
          color={state.active === 7 ? "#E1FF00" : "rgba(255, 255, 255, 0.7)"}
          callbackPress={pickImage}
        />
        <ToolButton
          icon={"close-box-multiple"}
          size={24}
          color={"red"}
          callbackPress={openClearModal}
        />
        <ToolButton
          icon={"content-save"}
          size={24}
          color={"rgba(255, 255, 255, 0.7)"}
          callbackPress={openSavingModal}
        />
      </View>

      {/* Choose brush width */}
      <ModalComponent
        animationType={"translateY"}
        translateAnim={translateAnim}
        modalCenter={false}
        visible={state.brushModalVisible}
      >
        <Text style={commonStyles.paragraph}>{i18n.t("chooseBrush")}</Text>
        <Text style={commonStyles.paragraph}>{state.brushWidth}</Text>
        <Slider
          style={{ width: 200, height: 40, marginBottom: 10 }}
          minimumValue={1}
          maximumValue={15}
          step={15}
          value={state.brushWidth}
          minimumTrackTintColor="rgba(255,255,255,0.7)"
          maximumTrackTintColor="rgba(255,255,255,0.3)"
          onValueChange={handleBrushWidth}
          thumbTintColor={"#E1FF00"}
        />

        <OpacityButton
          callback={closeModal}
          customStyle={buttons.secondaryButton}
        >
          <Text style={buttons.secondaryButtonText}>Ok</Text>
        </OpacityButton>
      </ModalComponent>

      {/* Choose brush color */}
      <ModalComponent
        animationType={"translateY"}
        translateAnim={translateAnim}
        modalCenter={false}
        visible={state.colorModalVisible}
      >
        <Text style={commonStyles.paragraph}>{i18n.t("chooseColor")}</Text>
        <View style={{ height: 280, width: "60%", paddingBottom: 30 }}>
          <ColorPicker
            color={state.currentColor}
            thumbSize={40}
            sliderSize={40}
            noSnap={true}
            row={false}
            sliderHidden={false}
            swatches={false}
            gapSize={0}
            onColorChangeComplete={handleColor}
          />
        </View>
        <OpacityButton
          callback={closeModal}
          customStyle={buttons.secondaryButton}
        >
          <Text style={buttons.secondaryButtonText}>Ok</Text>
        </OpacityButton>
      </ModalComponent>

      {/* Delete all */}
      <ModalComponent
        animationType={"translateY"}
        translateAnim={translateAnim}
        modalCenter={false}
        visible={state.clearModalVisible}
      >
        <Text style={commonStyles.paragraph}>{i18n.t("modalDelete")}</Text>
        <View style={buttons.twoButton}>
          <OpacityButton
            callback={closeModal}
            customStyle={buttons.secondaryButton}
          >
            <Text style={buttons.secondaryButtonText}>{i18n.t("no")}</Text>
          </OpacityButton>
          <OpacityButton
            callback={handleClear}
            customStyle={[buttons.secondaryButton, buttons.dangerButton]}
          >
            <Text style={buttons.dangerButtonText}>{i18n.t("confirm")}</Text>
          </OpacityButton>
        </View>
      </ModalComponent>

      {/* Do you want to save? */}
      <ModalComponent
        animationType={"fade"}
        fadeAnim={fadeAnim}
        modalCenter={true}
        visible={state.savingModalVisible}
      >
        <Text style={[commonStyles.paragraph]}>{i18n.t("saving")}</Text>

        <Inputbox
          type={"default"}
          placeholder="File name"
          callbackChange={getName}
        />
        {state.errorVisible && (
          <Text style={{ color: "red" }}>{i18n.t("errorMessage")}</Text>
        )}

        <View style={buttons.twoButton}>
          <OpacityButton
            callback={closeModal}
            customStyle={buttons.secondaryButton}
          >
            <Text style={buttons.secondaryButtonText}>
              {i18n.t("continueEditing")}
            </Text>
          </OpacityButton>
          <OpacityButton
            callback={handleConfirm}
            customStyle={[buttons.secondaryButton, buttons.confirmButton]}
          >
            <Text style={buttons.secondaryButtonText}>{i18n.t("save")}</Text>
          </OpacityButton>
        </View>
      </ModalComponent>

      {/* Correctly saved */}
      <ModalComponent
        animationType={"translateY"}
        translateAnim={translateAnim}
        modalCenter={false}
        visible={state.correctSavingModalVisible}
      >
        <Text style={commonStyles.paragraph}>{i18n.t("correctSaving")}</Text>
        <View style={buttons.twoButton}>
          <OpacityButton
            callback={closeModal}
            customStyle={buttons.secondaryButton}
          >
            <Text style={buttons.secondaryButtonText}>
              {i18n.t("continueEditing")}
            </Text>
          </OpacityButton>
          <OpacityButton
            callback={goToHome}
            customStyle={[buttons.secondaryButton, buttons.confirmButton]}
          >
            <Text style={buttons.secondaryButtonText}>
              {i18n.t("backHome")}
            </Text>
          </OpacityButton>
        </View>
      </ModalComponent>

      {/* Something went wrong */}
      <ModalComponent
        animationType={"translateY"}
        translateAnim={translateAnim}
        modalCenter={false}
        visible={state.errorSavingModalVisible}
      >
        <Text style={commonStyles.paragraph}>{i18n.t("errorSaving")}</Text>
        <OpacityButton
          callback={closeModal}
          customStyle={buttons.secondaryButton}
        >
          <Text style={buttons.secondaryButtonText}>{i18n.t("tryAgain")}</Text>
        </OpacityButton>
      </ModalComponent>

      {/* Empty canvas */}
      <ModalComponent
        animationType={"translateY"}
        translateAnim={translateAnim}
        modalCenter={false}
        visible={state.errorSavingModalVisible}
      >
        <Text style={commonStyles.paragraph}>{i18n.t("modalEmptyCanvas")}</Text>
        <OpacityButton
          callback={closeModal}
          customStyle={buttons.secondaryButton}
        >
          <Text style={buttons.secondaryButtonText}>{i18n.t("ok")}</Text>
        </OpacityButton>
      </ModalComponent>
    </View>
  )
}

export default Sign
