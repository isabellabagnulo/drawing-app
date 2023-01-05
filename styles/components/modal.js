import { StyleSheet } from "react-native"

export default StyleSheet.create({
  bottomView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
    centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 50
  },
  modalView: {
    position: 'relative',
    width: '100%',
    backgroundColor: "black",
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: 'center'
  },
  modalButton: {
    marginTop: 20
  }
})
