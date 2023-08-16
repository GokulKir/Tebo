import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

const Stack = createStackNavigator();

//Ssid page//
import SsidTyping from './src/pages/SsidTyping';
//Ssid page//
//Passwords page//
import PasswordTyping from './src/pages/PasswordTyping';
//Passwords page//
//UID page//
import UniqidTyping from './src/pages/UniqidTyping';
//UID page//
//Connection page//
import ConnectionChecking from './src/pages/ConnectionChecking';
//Connection page//
//Api checking page//
import ApiCheckingpage from './src/pages/ApiCheckingpage';
//Api checking page//

//Header component//
import Header from './src/components/Header';
//Header component//

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen 
       name="CHECKING" 
       component={ConnectionChecking} 
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
        headerStyle :{ backgroundColor: '#fff'}}} /> */}
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

            headerTitle: props => <Header {...props} />,
            headerStyle: {backgroundColor: '#fff'},
          }}
        />

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

            headerTitle: props => <Header {...props} />,
            headerStyle: {backgroundColor: '#fff'},
          }}
        />

        <Stack.Screen
          name="UID"
          component={UniqidTyping}
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

            headerTitle: props => <Header {...props} />,
            headerStyle: {backgroundColor: '#fff'},
          }}
        />
        <Stack.Screen
          name="ApiCheck"
          component={ApiCheckingpage}
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
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
