import { StyleProp, ViewStyle } from "react-native";
import { colors } from "../../colors";

export const containerStyles: StyleProp<ViewStyle> = {
    width: '90%',
    height: 'auto',
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 25,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 4},
    elevation: 4, // Для Android
    marginTop: 20
};