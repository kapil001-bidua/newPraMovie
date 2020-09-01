import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  Text,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from '../screen/User/Login';
import Customers from '../screen/Customer/Customer';
import Colors from '../constants/Colors';
import StartupScreen from '../screen/StartupScreen';
import SignUp from '../screen/User/SignUp';
import Details from '../screen/Customer/Details';
import Edit from '../screen/Customer/Edit';
//Define a global color for toolbar
global.backgroundColor = '#176abf';
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.green_color : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.green_color,
};

const AuthNavigator = createStackNavigator(
  {
    StartupScreen: StartupScreen,
    Customers: Customers,
    Login: Login,
    Details: Details,
    SignUp: SignUp,
    Edit: Edit,
  },
  {
    headerMode: null,
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

const MainNavigator = createSwitchNavigator({
  AuthNavigator: AuthNavigator,
});

export default createAppContainer(MainNavigator);
