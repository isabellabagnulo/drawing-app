import { Dimensions, StyleSheet } from "react-native";

let ScreenHeight = Dimensions.get("window").height
let ScreenWidth = Dimensions.get("window").width

export default StyleSheet.create({
    genericContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    homeContainer: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        backgroundColor: 'black'
    },

    centeredSection: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    workSection: {
        alignItems: 'center'
    },
    gridSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 30
    },
    workContainer: {
        margin: 10,
        alignItems: 'center'
    },
    workContainerCentered: {
        justifyContent: 'center',
        height: '100%'
    },
    work: {
        height: (ScreenHeight / 4) - 10,
        width:( ScreenWidth / 4) - 10,
        // backgroundColor: 'white'
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'white'
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: 'white'
    },
    paragraph: {
        color: 'rgba(255,255,255,0.6)',
        paddingVertical: 5,
    },
    paragraphBig: {
        fontSize: 18,
        width: ScreenWidth / 2,
        textAlign: 'center'
    }
})