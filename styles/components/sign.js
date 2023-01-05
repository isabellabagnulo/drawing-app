import { Dimensions, StyleSheet } from "react-native";

let ScreenHeight = Dimensions.get("window").height
let ScreenWidth = Dimensions.get("window").width

export const signatureStyle = `
body, html{
    height: 100%;
    width: 100%;
}
.m-signature-pad--footer{
    display: none;
    margin: 0;
    height: 0
}
`