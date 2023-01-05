import { StyleSheet } from "react-native";

export default StyleSheet.create({
    headerContainer: {
        width: '100%',
        // paddingRight: 20,
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        zIndex: 9,
        elevation: 9,
        borderBottomWidth: 0.5,
        borderBottomColor: "rgba(255,255,255,0.4)"
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitleLabel: {
        fontSize: 22,
        color: "white",
    },
    headerTitleHome: {
        padding: 20
    },
    headerTitlePages: {
        paddingVertical: 20
    },
    headerIcon: {
        margin: 24
    }
})