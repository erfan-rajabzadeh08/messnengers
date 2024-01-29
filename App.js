import React,{ useEffect } from 'react';
import { SafeAreaProvider,SafeAreaView  } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen'
import { store } from './store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LogBox,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Appnavigator from './navigaton/Appnavigator';
import { Provider } from 'react-redux';

 LogBox.ignoreLogs(['AsyncStorge has been extracted'])
//AsyncStorage.clear()
 function App() {
  const isDarkMode = useColorScheme() === 'dark';
 useEffect(()=>{
  if(Platform.OS==='android')
  SplashScreen.hide();

},[])

return (
  <Provider store={store}>
  <SafeAreaProvider>
<Appnavigator />
</SafeAreaProvider>
</Provider>
)};





export default App;
