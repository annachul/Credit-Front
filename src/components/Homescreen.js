import * as SecureStore from 'expo-secure-store';
import React, { Component, useEffect } from 'react';
import { View, Button, StyleSheet, Text, TextInput } from 'react-native';
import RNPickerSelect from "react-native-picker-select";


function HomeScreen({ navigation }) {
    const [categoryies, setCategories] = React.useState([])
    
    useEffect(()=>{SecureStore.getItemAsync('secure_token').then(token => {
      fetch('http://6031-88-10-182-37.ngrok.io/api/categories',
      {
          headers: {
              'Authorization': `Token ${token}`
              }    
      })
      .then (response => response.json())
      .then (response => setCategories(response))
      .then (response => console.log(response))})
  }, [])

return (
  <View style={styles.formContainerStyle}>
    <Text >Add new expense</Text>
    <View>
    <TextInput
            placeholder="Sum"
            autoCorrect={false}
            style={styles.textInputStyle}
          />
    <TextInput
            placeholder="Info"
            autoCorrect={false}
            style={styles.textInputStyle}
          />
    </View>
    <View style={styles.picker}>
    <RNPickerSelect
                 onValueChange={(value) => console.log(value)}
                 placeholder={{ label: "Select a category", value: null }}
                 items={[
                     { label: "🥬 Groceries", value: "Groceries" },
                     { label: "🍕 Restaurants", value: "Restaurants" },
                     { label: "🐶 Dogs", value: "Dogs" },
                     { label: "👾 Amazon", value: "Amazon" },
                     { label: "🎮 Games", value: "Games" },
                     { label: "🌸 Make up", value: "Make up" },
                     { label: "🧗🏻 Activities", value: "Activities" }
                 ]}
             />
    </View>
    <Button color= '#9370DB' title="Подтвердить"/>
  </View>
);
} 

const styles = StyleSheet.create({
    buttonContainerStyle: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    textInputStyle: {
      padding: 15,
      width: 300,
      justifyContent: 'center',
      margin: 6,
      borderColor: "#9370DB",
      borderWidth: 1,
      borderRadius: 10
    }, 
    formContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      picker: {
        fontSize: 16,
        padding: 15,
        borderColor: "#9370DB",
        borderWidth: 1,
        borderRadius: 10,
        paddingRight: 30,
        width: 300,
        margin: 6,
      },

  });
  

export default HomeScreen;