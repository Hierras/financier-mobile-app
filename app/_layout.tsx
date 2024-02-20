import { useCallback } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Slot } from 'expo-router';
import Menu from './menu';
import Header from './header';
import { Provider } from 'react-redux';
import { store } from './redux/store';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Cuprum': require('../assets/fonts/Cuprum.ttf'),
    'Lobster': require('../assets/fonts/Lobster.ttf'),
    'Roboto': require('../assets/fonts/Roboto.ttf')
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
        <Menu/>
        <SafeAreaView>
          <Header/>
          <Slot/>
        </SafeAreaView>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 0,
    margin: 0
  },
});

