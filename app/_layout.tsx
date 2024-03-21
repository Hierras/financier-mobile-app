import { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import WelcomeLayout from "./routes/welcome/_layout";
import Menu from "./routes/menu";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./routes/header";
import { Slot } from "expo-router";
import { colors } from './colors';
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {

    const [fontsLoaded, fontError] = useFonts({
        'Cuprum': require('../assets/fonts/Cuprum.ttf'),
        'Lobster': require('../assets/fonts/Lobster.ttf'),
        'Roboto': require('../assets/fonts/Roboto.ttf'),
        'Raleway': require('../assets/fonts/Raleway.ttf')
      });
    
      const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded, fontError]);
    
      if (!fontsLoaded && !fontError) {
        return null;
      }

    return (
        <Provider store={store}>
          <View onLayout={onLayoutRootView} style={styles.container}>
            <WelcomeLayout/>
            <Menu/>
            <SafeAreaView>
              <Header/>
              <Slot/>
            </SafeAreaView> 
          </View>
        </Provider>
        
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      padding: 0,
      margin: 0,
      backgroundColor: colors.ligthgrey
    },
  });
  