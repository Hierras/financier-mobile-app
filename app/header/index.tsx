import { View, Pressable, Text, StyleProp, ViewStyle } from "react-native";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { colors } from "./../colors";
import { Props } from "@fortawesome/react-native-fontawesome";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useDispatch } from "react-redux";
import { openMenu } from "../redux/configureSlice";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Header() {
    const dispatch = useDispatch();

    return (
      <SafeAreaView style={header}>
        <View>
          <Pressable onPress={()=>dispatch(openMenu())}>
            <FontAwesomeIcon {...navIconProps} />
          </Pressable>
        </View>
        <View>
          <Text>
            [Название] [Параметр]
          </Text>
        </View>
        <View>
          <Text>
            [Массив кнопок]
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  const header: StyleProp<ViewStyle> = {
    marginTop: 30,
    marginLeft: 24,
    display: 'flex',
    flexDirection:'row'
  }
  const navIconProps: Props = {
    color: colors.main,
    size: 24,
    icon: faBars
}