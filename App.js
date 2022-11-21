import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import Results from './screens/Results';
import Search from './screens/Search';
import ItemForm from './screens/ItemForm';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import HeaderIcons from './components/HeaderIcons';
import { GlobalProvider } from './context/GlobalContext';
import Admin from './screens/Admin';
import { init, fetchAll, dropTable } from './utils/database';
import { useGlobalContext } from './context/GlobalContext';
import {useFonts} from 'expo-font';

const Stack = createNativeStackNavigator();


function Root() {

  const {initialData} = useGlobalContext()

  useEffect(() => {

    const startup = async() => {
      await init()
      await initialData()
    }

    startup()

  }, [])


  return (
    <>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerRight: () => <HeaderIcons />,
        headerStyle: {backgroundColor: '#477a1e', },
        headerTintColor: 'white'
      }}>
        <Stack.Screen name="Results" component={Results} options={{title: 'Place List'}} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="ItemForm" component={ItemForm} />
        {/* <Stack.Screen name="Admin" component={Admin} /> */}
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

export default function App(){

  const [fontsLoaded] = useFonts({
    'orbitronBold': require('./assets/fonts/Orbitron-Bold.ttf'),
    'orbitron': require('./assets/fonts/Orbitron-Regular.ttf'),
    'orbitronMedium': require('./assets/fonts/Orbitron-Medium.ttf'),
    'orbitronExtra': require('./assets/fonts/Orbitron-ExtraBold.ttf'),
    'orbitronBlack': require('./assets/fonts/Orbitron-Black.ttf'),

  });

  if(!fontsLoaded){
    return <View><Text>LOADING...</Text></View>
  }


  return <>
  <StatusBar style="light" />
  <GlobalProvider>
    <Root />
  </GlobalProvider>
  </>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
