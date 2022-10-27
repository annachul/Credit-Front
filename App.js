// import * as React from 'react';
// import { Text, View, Button } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { AuthProvider } from "./src/context/AuthContext";

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home</Text>
//     </View>
//   );
// }


// function SignIn({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>SignIn!</Text>
//       <Button
//         title="Go to SignUp"
//         onPress={() => navigation.navigate('SignUp')}
//       />
//       <Button
//         title="Go to Content"
//         onPress={() => navigation.navigate('Content')}
//       />
//     </View>
//   );
// }


// function SignUp({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>SignIn!</Text>
//       <Button
//         title="Go to SignIn"
//         onPress={() => navigation.navigate('Home')}
//       />
//     </View>
//   );
// }

// function ArchiveScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Archive!</Text>
//     </View>
//   );
// }

// function AnalysisScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Analysis!</Text>
//     </View>
//   );
// }

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// function Content() {
//   return (
    
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === 'Add') {
//               iconName = focused
//                 ? 'ios-add-circle-outline'
//                 : 'ios-add-circle';
//             } else if (route.name === 'Archive') {
//               iconName = focused ? 'ios-archive-outline' : 'ios-archive';
//             } else if (route.name === 'Analysis') {
//               iconName = focused ? 'ios-analytics-outline' : 'ios-analytics';}

            
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: 'purple',
//           tabBarInactiveTintColor: 'gray',
//         })}
//       >
//         <Tab.Screen name="Add" component={HomeScreen} />
//         <Tab.Screen name="Archive" component={ArchiveScreen} />
//         <Tab.Screen name="Analysis" component={AnalysisScreen} />
//       </Tab.Navigator>
//   );
// }

// function App() {
//   return (
//     <NavigationContainer>
//       <AuthProvider>
//       <Stack.Navigator>
//       <Stack.Screen name="Home" component={SignIn} />
//         <Stack.Screen
//           name="Content"
//           component={Content}
//           options={{ headerShown: false }}
//         />

//         <Stack.Screen name="SignUp" component={SignUp} />
//       </Stack.Navigator>
//       </AuthProvider>
//     </NavigationContainer>
//   );
// }
// export default App;


import React, { Component } from 'react';
import axios from 'axios';
import Router from './src/Router';
import { baseURL } from './src/config';


export default class App extends Component {
  componentWillMount() {
    axios.defaults.baseURL = baseURL;
    axios.defaults.timeout = 1500;
  }

  render() {
    return (
      <Router />
    );
  }
}