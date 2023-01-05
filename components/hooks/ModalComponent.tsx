import { FC, useRef, useState } from "react"
import { Animated, Modal, Pressable, Text, View } from "react-native"

import modal from "../../styles/components/modal"

interface ModalComponentProps {
  children: any
  visible: boolean
  callback?: Function
  modalCenter: boolean
  animationType: string
  fadeAnim?: any
  translateAnim?: any
}

interface State {
  modalCenter: boolean
  animationType: string
}

const ModalComponent: FC<ModalComponentProps> = (props) => {
  const InitialState = {
    modalCenter: props.modalCenter,
    animationType: props.animationType,
  }
  const [state, setState] = useState<State>(InitialState)
  const [modalVisible, setModalVisible] = useState(false)

  function setModal(): void {
    setModalVisible(props.visible)
  }

  return (
    <Modal transparent={true} visible={props.visible} onRequestClose={setModal}>
      <View style={state.modalCenter ? modal.centeredView : modal.bottomView}>
        <Animated.View
          style={[
            modal.modalView,
            state.animationType === "fade"
              ? { opacity: props.fadeAnim }
              : state.animationType === "translateY"
              ? { transform: [{ translateY: props.translateAnim }] }
              : {},
          ]}
        >
          {props.children}
        </Animated.View>
      </View>
    </Modal>
  )
}

export default ModalComponent
