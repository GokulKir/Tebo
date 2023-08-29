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

//Video Stram page//
import VideoStream from './src/pages/VideoStream';
//Video Stram page//

//Bluetooth List page//
import BluetoothList from './src/pages/BluetoothList';
//Bluetooth List page//


//Asyncstorage module//
import AsyncStorage from '@react-native-async-storage/async-storage';
//Asyncstorage module//


//User Login defined module//
import { isLoggedInState } from './src/Recoil/recoilState';
import { useRecoilValue } from 'recoil';
//User Login defined module//



export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const isLoggedIn = useRecoilValue(isLoggedInState)

  return (
    <NavigationContainer>
      <Stack.Navigator>

      <Stack.Screen
          name="BleList"
          component={BluetoothList}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 900,
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 800,
                },
              },
            },
            headerShown: false,
          }}
        /> 

      {/* <Stack.Screen
          name="BleList"
          component={BluetoothList}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 900,
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 800,
                },
              },
            },
            headerShown: false,
          }}
        /> */}
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
            headerTitle: props => <Header {...props} />,
            headerStyle: {backgroundColor: '#fff'},
          }}
        />

<Stack.Screen
          name="Stream"
          component={VideoStream}
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
