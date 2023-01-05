// #E1FF00

import { Dimensions, StyleSheet } from "react-native";

let ScreenHeight = Dimensions.get("window").height

export default StyleSheet.create({
    buttonContainer: {
        margin: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    buttonLabel: {
        fontSize: 14,
    },

    twoButton: {
        flexDirection: 'row',
        marginTop: 15
    },

    primaryButton: {
        backgroundColor: '#E1FF00',
        borderRadius: 3,
        shadowColor: "#E1FF00",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        marginTop: 20
    },
    secondaryButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 3,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    secondaryButtonText: {
        color: 'black',
        textAlign: 'center'
    },
    confirmButton : {
        backgroundColor: '#E1FF00',
        marginLeft: 5
    },
    dangerButton : {
        backgroundColor: 'red',
        marginLeft: 5,
        borderRadius: 3,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: 'auto',
        alignItems: 'center'
    },
    dangerButtonText: {
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center'
    },

    buttonsToolsContainer: {
        backgroundColor: 'black',
        position: 'absolute',
        bottom: ScreenHeight - 380,
        left: 0,
        zIndex: 99
    },
    buttonTool: {
        height: 40,
        width: 40,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'   
    },
    buttonBorder: {
        borderRadius: 24,
        width: 24,
        height: 24,
    }
})