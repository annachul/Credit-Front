import * as SecureStore from 'expo-secure-store';
import React, { Component, useEffect } from 'react';
import { View, Button, StyleSheet, Text, TextInput } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

function HomeScreen({ navigation }) {
  const items = [
    {  
      name: "Fruits",
      id: 0,
      children: [{
          name: "Apple",
          id: 10,
        },{
          name: "Strawberry",
          id: 17,
        },{
          name: "Pineapple",
          id: 13,
        },{
          name: "Banana",
          id: 14,
        },{
          name: "Watermelon",
          id: 15,
        },{
          name: "Kiwi fruit",
          id: 16,
        }]
    },
    {
      name: "Gems",
      id: 1,
      children: [{
          name: "Quartz",
          id: 20,
        },{
          name: "Zircon",
          id: 21,
        },{
          name: "Sapphire",
          id: 22,
        },{
          name: "Topaz",
          id: 23,
        }]
    },
    {
      name: "Plants",
      id: 2,
      children: [{
          name: "Mother In Law\'s Tongue",
          id: 30,
        },{
          name: "Yucca",
          id: 31,
        },{
          name: "Monsteria",
          id: 32,
        },{
          name: "Palm",
          id: 33,
        }]
    },
  ]

  const  handleRequest = () => {
    console.log(selectedItem);
    
  }

const onSelectedItemsChange = (selectedItems) => {
  console.log(selectedItems);
  setSelectedItem(selectedItems);
}
  const [selectedItem, setSelectedItem] = React.useState([])
  const [categories, setCategories] = React.useState([])
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
    <SectionedMultiSelect style={styles.picker}
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
        />
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
        //alignItems: 'center',
        justifyContent: 'center',
      },
      picker: {
        alignItems: 'left'
      },

  });
  

export default HomeScreen;