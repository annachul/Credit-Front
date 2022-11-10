import * as SecureStore from 'expo-secure-store';
import React, { Component, useEffect } from 'react';
import { View, Button, StyleSheet, Text, TextInput } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios, { Axios } from 'axios';

function HomeScreen({ navigation }) {

  const  handleRequest = () =>  {
    var payload = {name: info, price: sum, category: selectedItem[0]}
    SecureStore.getItemAsync('secure_token').then(token => {
  
      axios
      .post('https://1a34-88-10-178-60.eu.ngrok.io/api/payments', payload,
)
      .then (response => response.json())
      .then (response => {
        console.log(response)
      })
      })
  }

const onSelectedItemsChange = (selectedItems) => {
  console.log(selectedItems);
  setSelectedItem(selectedItems);
}
  const [selectedItem, setSelectedItem] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [info, setInfo] = React.useState("")
  const [sum, setSum] = React.useState("");
    useEffect(()=>{SecureStore.getItemAsync('secure_token').then(token => {

      fetch('https://1a34-88-10-178-60.eu.ngrok.io/api/categories',
      {
          headers: {
              'Authorization': `Token ${token}`
              }    
      })
      .then (response => response.json())
      .then (response => {
        console.log(response)
        var categories = [{label: "Other", value: response['id']}]
        for (var i = 0; i < response['children'].length; i++) {
          categories.push({label: response['children'][i]["name"], value: response['children'][i]["id"]})
      }
      console.log(response['children'])
      setCategories(response['children'])
      })
    })

  }, [])

return (
  <View style={styles.formContainerStyle}>
    <View style={styles.alignStyle}>
    <Text>Add new expense</Text></View>
    <View style={styles.alignStyle}>
    <TextInput
            placeholder="Sum"
            onChangeText={setSum}
            keyboardType='numeric'
            autoCorrect={false}
            value={sum}
            style={styles.textInputStyle}
          />
    <TextInput
            placeholder="Info"
            onChangeText={setInfo}
            autoCorrect={false}
            value={info}
            style={styles.textInputStyle}
          />
    </View>
    <View style={styles.picker}>
    <SectionedMultiSelect 
          styles={{button: {
            backgroundColor: '#9370DB',
          },
          }}
          single={true}
          IconRenderer={Icon}
          items={categories} 
          uniqueKey='id'
          subKey='children'
          selectText='Select a category'
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItem}
        /></View>
    <Button color= '#9370DB' title="Confirm" onPress={handleRequest.bind(this)}/>
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
        justifyContent: 'center',
      },
      picker: {
        padding: 0,
        width: 300,
        justifyContent: 'center',
        margin: 6,
        borderColor: "#9370DB",
        borderWidth: 1,
        borderRadius: 10,
        left: 30
      },
      alignStyle:{
        alignItems: 'center',
      },
  });
  

export default HomeScreen;