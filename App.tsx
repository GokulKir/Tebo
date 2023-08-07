import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator ,  CardStyleInterpolators  } from '@react-navigation/stack';

const Stack = createStackNavigator();

//Ssid page//
import SsidTyping from './src/pages/SsidTyping';
//Ssid page//
//Passwords page//
import PasswordTyping from './src/pages/PasswordTyping';
//Passwords page//


//Header component//
import Header from './src/components/Header';
//Header component//




export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
       <Stack.Screen 
       name="Ssid" 
       component={SsidTyping} 
       options={{
        
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 500,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 500,
              },
            },
          },
        
        headerTitle : (props) => <Header {...props}/> ,
        headerStyle :{ backgroundColor: '#fff'}}} />
      
      <Stack.Screen 
       name="Password" 
       component={PasswordTyping} 
       
      
       options={{ 
        
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 500,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 500,
              },
            },
          },
        
        
       
        headerTitle : (props) => <Header  {...props}/> ,
        headerStyle :{ backgroundColor: '#fff'}}} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}