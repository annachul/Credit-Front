import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginOrCreateForm from './common/LoginOrCreateForm';
import * as SecureStore from 'expo-secure-store';
import HomeScreen from './Homescreen';



function ArchiveScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Archive!</Text>
    </View>
  );
}

function AnalysisScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Analysis!</Text>
    </View>
  );
}


class Home extends Component {


  handleRequest() {
    
    axios
      .get('/auth/logout/')
      .then(response => {
        Actions.auth()
      })
      .catch(error =>  console.log(error));
  }

  render() {
    const Tab = createBottomTabNavigator();
    const { buttonContainerStyle } = styles;
    return (
      <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Add') {
              iconName = focused
                ? 'ios-add-circle-outline'
                : 'ios-add-circle';
            } else if (route.name === 'Archive') {
              iconName = focused ? 'ios-archive-outline' : 'ios-archive';
            } else if (route.name === 'Analysis') {
              iconName = focused ? 'ios-analytics-outline' : 'ios-analytics';}

            
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Add" component={HomeScreen} options={{headerShown:false}}/>
        <Tab.Screen name="Archive" component={ArchiveScreen} options={{headerShown:false}}/>
        <Tab.Screen name="Analysis" component={AnalysisScreen} options={{headerShown:false}}/>
      </Tab.Navigator>

      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
  buttonContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  textInputStyle: {
    flex: 1,
    padding: 15,
    margin: 2,
    borderColor: "#9370DB",
    borderWidth: 1,
    borderRadius: 10
  }
});

export default Home;
